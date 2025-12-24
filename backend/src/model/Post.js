import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    media: [
      {
        url: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["image", "video"],
          default: "image",
        },
      },
    ],

    caption: {
      type: String,
      trim: true,
      maxlength: 2200,
    },

    hashtags: {
      type: [String],
      index: true,
      default: [],
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

postSchema.path("media").validate(
  (val) => val.length > 0 && val.length <= 10,
  "Post must have 1 to 10 media items"
);

export const Post = mongoose.model("Post", postSchema);
