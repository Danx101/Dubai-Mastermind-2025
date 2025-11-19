import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://mastermind.abnehmenimliegen-info.com',
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
    const { applicationId, packageType, quantity } = req.body;

    // Validate required fields
    if (!applicationId || !packageType || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate package type and get Stripe Price ID from environment
    const stripePriceIds: Record<string, string | undefined> = {
      A: process.env.STRIPE_PRICE_A,
      B: process.env.STRIPE_PRICE_B,
    };

    if (packageType !== 'A' && packageType !== 'B') {
      return res.status(400).json({ error: 'Invalid package type' });
    }

    const priceId = stripePriceIds[packageType];

    if (!priceId) {
      console.error(`Missing Stripe price ID for package ${packageType}`);
      return res.status(500).json({ error: 'Payment configuration error' });
    }

    // Get the host from the request
    const host = req.headers.host || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    // Create Stripe Checkout Session using existing products
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/bewerbung?package=${packageType}`,
      metadata: {
        applicationId: applicationId,
        packageType: packageType,
        quantity: quantity.toString(),
      },
      customer_email: req.body.email || undefined,
    });

    return res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({
      error: 'Failed to create checkout session'
    });
  }
}
