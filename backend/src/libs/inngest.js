import { Inngest } from "inngest";
import { connectDb } from "./db.js";
import { User } from "../model/User.js";
import { upsertStreamUser, deleteStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "talent-iq" });


const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "user.created" },
  async ({ event }) => {
    await connectDb();

    const { userId } = event.data;

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    await upsertStreamUser({
      id: user._id.toString(),
      name: user.name,
      image: user.profileImage,
    });
  }
);


const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user" },
  { event: "user.deleted" },
  async ({ event }) => {
    const { userId } = event.data;

    await deleteStreamUser(userId.toString());
  }
);

export const functions = [syncUser, deleteUserFromDB];
