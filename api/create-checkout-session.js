// Vercel serverless function (Node.js runtime). Lives at the project root in
// /api so Vercel picks it up automatically — no Astro SSR adapter needed,
// since the rest of the site stays a plain static build.
//
// Requires these environment variables to be set in the Vercel project
// (Project Settings -> Environment Variables), never committed to git:
//   STRIPE_SECRET_KEY            - starts with sk_live_ or sk_test_
//   STRIPE_PRICE_PDF_REPORT      - Price ID from the Stripe Dashboard
//   STRIPE_PRICE_AI_COVER_LETTER - Price ID from the Stripe Dashboard
//   PUBLIC_SITE_URL              - e.g. https://afrimigrate.com (for redirect URLs)

import Stripe from 'stripe';

const PRICE_ENV_BY_PRODUCT = {
  'pdf-report': 'STRIPE_PRICE_PDF_REPORT',
  'ai-cover-letter': 'STRIPE_PRICE_AI_COVER_LETTER',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe is not configured yet on this deployment.' });
  }

  const { product } = req.body ?? {};
  const priceEnvVar = PRICE_ENV_BY_PRODUCT[product];
  const priceId = priceEnvVar && process.env[priceEnvVar];
  if (!priceId) {
    return res.status(400).json({ error: 'Unknown or unconfigured product.' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const siteUrl = process.env.PUBLIC_SITE_URL || 'https://afrimigrate.com';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/premium?success=1&product=${encodeURIComponent(product)}`,
      cancel_url: `${siteUrl}/premium?canceled=1`,
    });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout session error:', err);
    return res.status(500).json({ error: 'Could not start checkout. Please try again.' });
  }
}
