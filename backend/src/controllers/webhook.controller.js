import Stripe from "stripe";
import Payment from "../model/Payment.js";
import { User } from "../model/User.js";
import { STRIPE_PLANS } from "../libs/stripePlans.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {

      case "checkout.session.completed": {
        const session = event.data.object;

        if (session.payment_status !== "paid") break;

        const { userId, planKey } = session.metadata;
        const plan = STRIPE_PLANS[planKey];
        if (!plan) break;

        const exists = await Payment.findOne({
          checkoutSessionId: session.id,
        });
        if (exists) break;

        const endDate = new Date(
          Date.now() + plan.durationDays * 24 * 60 * 60 * 1000
        );

        await User.findByIdAndUpdate(userId, {
          subscriptionType: planKey,
          userType: "premium",
          endDate,
          $inc: { credits: plan.credits },
        });

        await Payment.create({
          user: userId,
          subscriptionType: planKey,
          amount: session.amount_total / 100,
          currency: session.currency,
          paymentStatus: "completed",
          paymentMethod: "stripe",
          paymentId: session.payment_intent,
          checkoutSessionId: session.id,
          creditsAdded: plan.credits,
          startDate: new Date(),
          endDate,
          isActive: true,
          metadata: session.metadata,
        });

        console.log("Subscription activated:", userId);
        break;
      }

      case "invoice.payment_succeeded":
      case "invoice.payment_failed":
      case "invoice_payment.paid":
        console.log("Invoice event received:", event.type);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });

  } catch (err) {
    console.error("Webhook handler error:", err);
    res.status(500).json({ error: "Webhook handler failed" });
  }
};
