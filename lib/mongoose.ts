import mongoose from "mongoose";

let isConnect: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("Missing MONGODB_URL");
  if (isConnect) return;

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "DevFlow",
    });
    isConnect = true;
  } catch (error) {
    console.log("An error occurs into connection process", error);
  }
};
