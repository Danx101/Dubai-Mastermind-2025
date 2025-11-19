import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAdminNotificationEmail, getApplicantConfirmationEmail } from './email-templates.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export const config = {
  api: {
    bodyParser: false, // Stripe requires raw body for signature verification
  },
};

// Helper to get raw body
async function getRawBody(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rawBody = await getRawBody(req);
    const sig = req.headers['stripe-signature'] as string;

    // For testing, we'll skip signature verification if no webhook secret is set
    // In production, you MUST set STRIPE_WEBHOOK_SECRET
    let event: Stripe.Event;

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('STRIPE_WEBHOOK_SECRET is not configured');
      return res.status(500).json({ error: 'Webhook not configured' });
    }

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const applicationId = session.metadata?.applicationId;

        // Update application in Supabase
        const { data: application, error } = await supabase
          .from('applications')
          .update({
            payment_status: 'completed',
            stripe_payment_intent_id: session.payment_intent as string,
            total_amount: session.amount_total,
          })
          .eq('id', applicationId)
          .select()
          .single();

        if (error) {
          console.error('Failed to update application:', error);
          return res.status(500).json({ error: 'Failed to update application' });
        }

        console.log('Payment completed for application:', applicationId);

        // Send email notifications after successful payment
        if (application) {
          const emailData = {
            firstName: application.first_name,
            lastName: application.last_name,
            email: application.email,
            phone: application.phone,
            packageType: application.package_type,
            quantity: application.quantity,
            message: application.message,
            applicationId: application.id,
            createdAt: new Date(application.created_at).toLocaleString('de-DE'),
          };

          // Send admin notification
          const adminEmail = process.env.ADMIN_EMAIL || 'jc@abnehmenimliegen.at';
          try {
            await resend.emails.send({
              from: 'Chris Steiner Mastermind <noreply@ail-studios.com>',
              to: adminEmail,
              subject: `Neue Mastermind Bewerbung - ${emailData.firstName} ${emailData.lastName}`,
              html: getAdminNotificationEmail(emailData),
            });
            console.log('Admin email sent for application:', applicationId);
          } catch (emailError) {
            console.error('Admin email error:', emailError);
          }

          // Send applicant confirmation
          try {
            await resend.emails.send({
              from: 'Chris Steiner Mastermind <noreply@ail-studios.com>',
              to: application.email,
              subject: 'Deine Mastermind Bewerbung wurde bestätigt',
              html: getApplicantConfirmationEmail(emailData),
            });
            console.log('Applicant email sent for application:', applicationId);
          } catch (emailError) {
            console.error('Applicant email error:', emailError);
          }
        }

        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;

        // Optionally mark as failed or do nothing
        console.log('Checkout session expired:', session.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Webhook handler failed' });
  }
}
