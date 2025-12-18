import Session from "../model/Session.js";
import {User} from "../model/User.js";
import { chatClient, streamClient } from "../libs/stream.js";

export const createSession = async (req, res) => {
  try {
    const hostId = req.user.id; 

    const user = await User.findById(hostId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const callId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2)}`;

    const session = await Session.create({
      host: hostId,
      callId,
    });

    await streamClient.video
      .call("default", callId)
      .getOrCreate({
        data: {
          created_by_id: hostId,
          custom: {
            sessionId: session._id.toString(),
          },
        },
      });

    const channel = chatClient.channel("messaging", callId, {
      name: "Video conferencing Session",
      created_by_id: hostId,
      members: [hostId],
    });

    await channel.create();

    res.status(201).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error("Error in createSession:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
