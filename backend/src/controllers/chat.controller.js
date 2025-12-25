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

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "question is required",
      });
    }

    let conversation;

    if (!conversationId) {
      conversation = await CreateChat.create({
        userId,
        title: question.slice(0, 30),
      });
    } else {
      conversation = await CreateChat.findOne({
        _id: conversationId,
        userId, 
      });

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found",
        });
      }
    }

    await Message.create({
      conversationId: conversation._id,
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
      conversationId: conversation._id,
      sender: "bot",
      content: aiMessage,
    });

    return res.status(200).json({
      success: true,
      conversationId: conversation._id,
      response: aiMessage,
    });
  } catch (error) {
    console.error("Error in messageSend:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal server error",
    });
  }
};
