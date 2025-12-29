import Stripe from "stripe";
import { STRIPE_PLANS } from "../libs/stripePlans.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { planKey } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const plan = STRIPE_PLANS[planKey];
    if (!plan) {
      return res.status(400).json({ error: "Invalid plan" });
    }

    const baseAmount = plan.amount; 
    const taxRate = 0.08; 
    const taxAmount = Math.round(baseAmount * taxRate);
    const totalAmount = baseAmount + taxAmount;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      customer_email: req.user.email, 

      billing_address_collection: "required",

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${planKey.toUpperCase()} Subscription`,
              description: plan.description || "Premium access subscription",
              images: [
                "https://res.cloudinary.com/dwbbklguy/image/upload/v1767006555/my_ozrtp4.avif",
              ],
              metadata: {
                planKey,
                credits: plan.credits.toString(),
                duration: `${plan.durationDays} days`,
              },
            },
            unit_amount: baseAmount * 100,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "GST (8%)",
              description: "Applicable tax",
            },
            unit_amount: taxAmount * 100,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.FRONTEND_URL}/pricing?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}`,

      metadata: {
        userId: req.user._id.toString(),
        planKey,
        baseAmount,
        taxAmount,
        totalAmount,
        credits: plan.credits,
      },

      invoice_creation: {
        enabled: true,
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    res.status(500).json({ error: "Checkout failed" });
  }
};
