import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-02-24.acacia' as any,
});

export async function POST(req: Request) {
  try {
    const { items, serviceMode, userEmail } = await req.json();

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.product.name.fr || item.product.name,
          images: [item.product.image],
        },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: userEmail || undefined,
      success_url: `${process.env.CLIENT_URL || 'http://localhost:4242'}/profile?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:4242'}/menu`,
      metadata: {
        serviceMode: serviceMode || 'sur_place',
      },
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe API Error:', error);
    return NextResponse.json({ error: error.message || 'Stripe Checkout Error' }, { status: 500 });
  }
}
