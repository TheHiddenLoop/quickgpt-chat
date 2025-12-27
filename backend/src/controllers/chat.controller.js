import OpenAI from "openai";
import dotenv from "dotenv";
import { CreateChat, Message } from "../model/Chat.js";
import { cloudinary } from "../libs/cloudnary.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const messageSend = async (req, res) => {
  try {
    const { question, conversationId, type } = req.body;
    const userId = req.user._id;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "question is required",
      });
    }

    let conversation = await CreateChat.findOne({ conversationId, userId });

    if (!conversation) {
      conversation = await CreateChat.create({
        conversationId,
        userId,
        title: question,
      });
    }

    await Message.create({
      conversationId,
      sender: "user",
      content: question,
      messageType: type || "text",
    });

    if (type === "image") {
      const workerResponse = await fetch(
        "https://image-ai-worker.unseenx.workers.dev",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: question }),
        }
      );

      if (!workerResponse.ok) {
        const text = await workerResponse.text();
        throw new Error(text);
      }

      const arrayBuffer = await workerResponse.arrayBuffer();
      const imageBuffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "ai-images" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        ).end(imageBuffer);
      });

      const botMsg = await Message.create({
        conversationId,
        sender: "bot",
        content: uploadResult.secure_url,
        messageType: "image",
      });

      return res.status(200).json({
        success: true,
        conversationId,
        response: {
          sender: "bot",
          content: uploadResult.secure_url,
          type: "image",
        },
      });
    }

    const response = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: question },
      ],
    });

    const aiMessage =
      response.choices[0].message?.content || "No response";

    const botMsg = await Message.create({
      conversationId,
      sender: "bot",
      content: aiMessage,
      messageType: "text",
    });

    return res.status(200).json({
      success: true,
      conversationId,
      response: {
        sender: "bot",
        content: aiMessage,
        type: "text",
      },
    });

  } catch (error) {
    console.error("Error in messageSend:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};



export const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;
    const conversations = await CreateChat.find({ userId }).sort({ updatedAt: -1 });

    if (conversations.length === 0) {
      return res.status(404).json({ success: false, message: "No conversations found" });
    }

    return res.status(200).json({
      success: true,
      message: "All conversations",
      conversations,
    });

  } catch (error) {
    console.error("Error in fetching conversations:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal server error",
    });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
    
    const filteredMessages = messages.map(e => ({
      content: e.content,
      sender: e.sender,
      type: e.messageType
    }));

    return res.status(200).json({
      success: true,
      messages: filteredMessages,
    });

  } catch (error) {
    console.error("Error in fetching all messages in conversation:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal server error",
    });
  }
};


