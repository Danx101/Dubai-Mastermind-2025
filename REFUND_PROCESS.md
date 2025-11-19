# Refund Process for Rejected Applications

## Overview
When an application is rejected, you must manually process a refund through Stripe and notify the applicant.

## Step-by-Step Refund Process

### 1. Review Application in Admin Dashboard
1. Go to https://mastermind.abnehmenimliegen-info.com/admin
2. Login with password: `Mastermind2026!`
3. Find the application to reject
4. Note the **Application ID** and **applicant email**

### 2. Process Refund in Stripe Dashboard
1. Go to https://dashboard.stripe.com/test/payments (test mode) or https://dashboard.stripe.com/payments (live mode)
2. Find the payment using the applicant's email or amount
3. Click on the payment
4. Click **"Refund"** button
5. Select **"Full refund"** or enter custom amount
6. Add reason: "Application not approved"
7. Click **"Refund €XXX"**

**Important:** Refunds typically take 5-10 business days to appear on the customer's account.

### 3. Update Application Status in Supabase (Optional)
1. Go to https://supabase.com
2. Navigate to **Table Editor** → **applications**
3. Find the application by ID
4. Update `payment_status` to `'failed'` or add a note

### 4. Send Rejection Email (Future Enhancement)
Currently manual - you can use the rejection email template in the codebase:

**Subject:** Bewerbungsstatus - Mastermind Dubai

**Body:** Use the `getApplicationRejectionEmail()` template from `api/email-templates.ts`

---

## Automated Refund (Future Enhancement)

To automate this process in the future, you would need to:

1. Add a "Reject Application" button in the admin dashboard
2. Create a new API endpoint: `/api/reject-application`
3. This endpoint would:
   - Get the Stripe payment intent ID from the database
   - Call Stripe API to refund: `stripe.refunds.create({ payment_intent: 'pi_xxx' })`
   - Update database status to 'refunded'
   - Send rejection email with refund confirmation

### Example Implementation (for future reference):

\`\`\`typescript
// api/reject-application.ts
import Stripe from 'stripe';
import { Resend } from 'resend';
import { getApplicationRejectionEmail } from './email-templates';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function handler(req, res) {
  const { applicationId } = req.body;

  // 1. Get application from Supabase
  const { data: application } = await supabase
    .from('applications')
    .select('*')
    .eq('id', applicationId)
    .single();

  // 2. Process refund in Stripe
  const refund = await stripe.refunds.create({
    payment_intent: application.stripe_payment_intent_id,
    reason: 'requested_by_customer', // or 'fraudulent', 'duplicate'
  });

  // 3. Update database
  await supabase
    .from('applications')
    .update({ payment_status: 'refunded' })
    .eq('id', applicationId);

  // 4. Send rejection email
  await resend.emails.send({
    from: 'Chris Steiner Mastermind <onboarding@resend.dev>',
    to: application.email,
    subject: 'Bewerbungsstatus - Mastermind Dubai',
    html: getApplicationRejectionEmail({
      firstName: application.first_name,
      lastName: application.last_name,
      refundAmount: refund.amount / 100,
      refundDate: new Date().toLocaleDateString('de-DE'),
    }),
  });

  return res.status(200).json({ success: true });
}
\`\`\`

---

## Important Notes

⚠️ **Always refund before sending rejection email** - This ensures the customer sees the refund is already processed.

⚠️ **Test Mode vs Live Mode** - Make sure you're in the correct Stripe dashboard mode:
- Test mode: https://dashboard.stripe.com/test/payments
- Live mode: https://dashboard.stripe.com/payments

⚠️ **Refund Timing** - Refunds can take 5-10 business days depending on the customer's bank. Set expectations in the rejection email.

⚠️ **Partial Refunds** - If you want to charge a processing fee, you can issue a partial refund. Be transparent about this in your terms.

---

## Customer Support

If an applicant contacts you about their refund:

1. Check Stripe dashboard for refund status
2. Provide the refund date and expected timeline (5-10 business days)
3. Advise them to contact their bank if it doesn't appear after 10 business days
4. Stripe support: https://support.stripe.com

**Contact Email:** danielgevel0208@gmail.com
