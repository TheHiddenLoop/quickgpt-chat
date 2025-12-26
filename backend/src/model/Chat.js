import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    conversationId :{
      type:String,
      required:true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: "New Chat",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }


);

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
      index: true,
    },
    sender: {
      type: String,
      enum: ["user", "bot"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "audio", "file"],
      default: "text",
    },
    meta: {
      type: Object, 
      default: {},
    },
  },
  { timestamps: true }
);

export const CreateChat =  mongoose.model("Conversation", conversationSchema);

export const Message =  mongoose.model("Message", messageSchema);
