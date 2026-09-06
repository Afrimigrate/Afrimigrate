// Vercel serverless function. Stripe calls this URL directly (not the browser)
// once a payment succeeds, so it must be registered in the Stripe Dashboard
// as an endpoint: https://afrimigrate.com/api/stripe-webhook
//
// Requires:
//   STRIPE_SECRET_KEY      - same as create-checkout-session.js
//   STRIPE_WEBHOOK_SECRET  - starts with whsec_, from the Dashboard's
//                            webhook endpoint settings (NOT the API key)
//
// Vercel needs the raw request body (unparsed) to verify Stripe's signature.
export const config = { api: { bodyParser: false } };

import Stripe from 'stripe';

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method not allowed');
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const signature = req.headers['stripe-signature'];
  const rawBody = await readRawBody(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // TODO (next phase, needs its own decision before building):
    //   - PDF report: render the user's saved CRS result + checklist to PDF
    //     and email it (e.g. via Resend or SendGrid) to session.customer_details.email
    //   - AI cover letter: call an LLM API with the user's profile details
    //     and email the generated draft
    // Neither of these has a data source yet — the calculator doesn't currently
    // save results anywhere, so the customer's inputs aren't available here.
    // That's the real next design decision, not just wiring the API call.
    console.log('Payment completed for', session.customer_details?.email, session.metadata);
  }

  return res.status(200).json({ received: true });
}
