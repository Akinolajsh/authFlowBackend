import mongoose from "mongoose";

interface isAuth {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  avatarID: string;
}

interface iAuthData extends isAuth, mongoose.Document {}

const authFlowModel = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  avatarID: {
    type: String,
  },
});

export default mongoose.model<iAuthData>("authFlows", authFlowModel);
