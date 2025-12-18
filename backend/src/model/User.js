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

    profileImage: {
      type: String,
      default:
        "https://res.cloudinary.com/dwbbklguy/image/upload/v1758796518/products/sgpkwdndo9yirsdsuddc.png",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

