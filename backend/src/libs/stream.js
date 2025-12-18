import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error("STREAM_API_KEY or STREAM_API_SECRET missing");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

export const streamClient = new StreamClient(apiKey, apiSecret);

export const upsertStreamUser = async ({ id, name, image }) => {
  if (!id) throw new Error("User id required");

  return chatClient.upsertUser({ id, name, image });
};

export const deleteStreamUser = async (userId) => {
  if (!userId) throw new Error("User id required");

  return chatClient.deleteUser(userId, { hard_delete: true });
};

export const createChatToken = (userId) =>
  chatClient.createToken(userId);

export const createVideoToken = (userId) =>
  streamClient.createToken(userId);
