import OpenAI from "openai";
import dotenv from "dotenv";
import { CreateChat, Message } from "../model/Chat.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const messageSend = async (req, res) => {
  try {
    const { question, conversationId } = req.body;
    const userId = req.user._id;

    console.log(conversationId);
    

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "question is required",
      });
    }

    // 🔹 conversationId MUST be present (as you said)
    let conversation = await CreateChat.findOne({
      conversationId,
      userId,
    });

    if (!conversation) {
      conversation = await CreateChat.create({
        conversationId,
        userId,
        title: question.slice(0, 30),
      });
    }

    await Message.create({
      conversationId,
      sender: "user",
      content: question,
    });

    const response = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: question },
      ],
    });

    const aiMessage =
      response.choices[0].message?.content || "No response";

    await Message.create({
      conversationId,
      sender: "bot",
      content: aiMessage,
    });

    return res.status(200).json({
      success: true,
      conversationId,
      response: {sender:"bot", content: aiMessage},
    });
  } catch (error) {
    console.error("Error in messageSend:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal server error",
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
      sender: e.sender
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


