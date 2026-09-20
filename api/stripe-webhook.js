// Vercel serverless function. Stripe calls this URL directly (not the browser)
// once a payment succeeds, so it must be registered in the Stripe Dashboard
// as an endpoint: https://afrimigrate.com/api/stripe-webhook
//
// Requires:
//   STRIPE_SECRET_KEY          - same as create-checkout-session.js
//   STRIPE_WEBHOOK_SECRET      - starts with whsec_, from the Dashboard's
//                                webhook endpoint settings (NOT the API key)
//   PUBLIC_SUPABASE_URL        - same Supabase project as the rest of the site
//   SUPABASE_SERVICE_ROLE_KEY  - Supabase Project Settings -> API -> "service_role"
//                                secret key. NEVER prefix this PUBLIC_ and never
//                                reference it from browser code — it bypasses every
//                                Row Level Security policy. It's used here, and only
//                                here, because this webhook runs server-side with no
//                                logged-in user session of its own, so it needs
//                                elevated access to update a DIFFERENT user's row
//                                (whichever user made the purchase).
//
// Vercel needs the raw request body (unparsed) to verify Stripe's signature.
export const config = { api: { bodyParser: false } };

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

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
    console.log('Payment completed for', session.customer_details?.email, session.metadata);

    // client_reference_id is the Supabase user id, set by create-checkout-session.js
    // when the buyer was logged in at checkout time. No id means an anonymous
    // purchase — payment still succeeded, there's just no account to flag.
    const userId = session.client_reference_id;
    if (userId && process.env.PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabaseAdmin = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
      const { error } = await supabaseAdmin.from('profiles').update({ is_premium: true }).eq('id', userId);
      if (error) {
        console.error('Failed to mark profile premium:', error.message);
      } else {
        console.log('Marked profile premium for user', userId);
      }
    }

    // TODO (next phase, needs its own decision before building):
    //   - PDF report: render the user's saved CRS result + checklist to PDF
    //     and email it (e.g. via Resend or SendGrid) to session.customer_details.email
    //   - AI cover letter: call an LLM API with the user's profile details
    //     and email the generated draft
    // Neither of these has a data source yet — the calculator doesn't currently
    // save results anywhere, so the customer's inputs aren't available here.
    // That's the real next design decision, not just wiring the API call.
    // Marking is_premium=true above is real and already works; the vault,
    // timeline and UK sponsor tracker it's meant to unlock are separate,
    // not-yet-built features (see CLAUDE.md Phase 3 steps 4-6) — is_premium
    // being true doesn't make those appear, it just correctly records that
    // this user has paid, ready for whenever those features exist.
  }

  return res.status(200).json({ received: true });
}
