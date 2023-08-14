import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const url: string = process.env.DATABASE!;

export const authBase = async () => {
  mongoose.connect(url).then((res) => {
    console.log("connection established");
  });
};
