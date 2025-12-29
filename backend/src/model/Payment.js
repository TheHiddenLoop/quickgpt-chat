import mongoose from "mongoose";

const { Schema, model } = mongoose;

const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subscriptionType: {
      type: String,
      enum: ["free", "monthly", "yearly"],
      required: true,
    },

    amount: {
      type: Number,
      required: true, 
    },

    currency: {
      type: String,
      default: "INR",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["stripe", "razorpay", "paypal", "wallet"],
      default: "stripe",
    },

    paymentId: {
      type: String,
      required: true, 
    },

    checkoutSessionId: {
      type: String, 
    },

    creditsAdded: {
      type: Number,
      default: 0, 
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    metadata: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Payment", paymentSchema);
