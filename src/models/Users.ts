import mongoose from "mongoose";

export interface IUsers {
  name: string;
  email: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const usersSchema = new mongoose.Schema<IUsers>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export default mongoose.models.Users ||
  mongoose.model<IUsers>("Users", usersSchema);
