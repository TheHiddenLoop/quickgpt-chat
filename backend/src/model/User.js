import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
    },

    credits: {
      type: Number,
      default: 50,
      min: 0,
    },

    userType: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },

    subscriptionType: {
      type: String,
      enum: ["free", "monthly", "yearly"],
      default: "free",
    },

    endDate: {
      type: Date,
    },

    profileImage: {
      type: String,
      default:
        "https://res.cloudinary.com/dwbbklguy/image/upload/v1758796518/products/sgpkwdndo9yirsdsuddc.png",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

