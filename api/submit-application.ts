import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAdminNotificationEmail, getApplicantConfirmationEmail } from './email-templates';

// Initialize clients
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, phone, packageType, quantity, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !packageType || !quantity || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate package type
    if (packageType !== 'A' && packageType !== 'B') {
      return res.status(400).json({ error: 'Invalid package type' });
    }

    // Validate quantity
    if (quantity < 1 || quantity > 10) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    // Save to Supabase
    const { data: application, error: dbError } = await supabase
      .from('applications')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        package_type: packageType,
        quantity,
        message,
        payment_status: 'pending',
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      console.error('Error details:', JSON.stringify(dbError, null, 2));
      return res.status(500).json({
        error: 'Failed to save application',
        details: dbError.message,
        code: dbError.code
      });
    }

    // Send email notification to admin
    try {
      await resend.emails.send({
        from: 'Mastermind Applications <onboarding@resend.dev>',
        to: 'danielgevel0208@gmail.com',
        subject: `Neue Mastermind Bewerbung - ${firstName} ${lastName}`,
        html: getAdminNotificationEmail({
          firstName,
          lastName,
          email,
          phone,
          packageType,
          quantity,
          message,
          applicationId: application.id,
          createdAt: new Date(application.created_at).toLocaleString('de-DE'),
        }),
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Don't fail the request if email fails - application is already saved
    }

    // Send confirmation email to applicant
    try {
      await resend.emails.send({
        from: 'Chris Steiner Mastermind <onboarding@resend.dev>',
        to: email,
        subject: 'Deine Mastermind Bewerbung wurde erhalten',
        html: getApplicantConfirmationEmail({
          firstName,
          lastName,
          email,
          phone,
          packageType,
          quantity,
          message,
          applicationId: application.id,
          createdAt: new Date(application.created_at).toLocaleString('de-DE'),
        }),
      });
    } catch (emailError) {
      console.error('Confirmation email error:', emailError);
    }

    return res.status(200).json({
      success: true,
      applicationId: application.id,
      message: 'Application submitted successfully',
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
