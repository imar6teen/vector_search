//* IMPORTANT : THIS MODEL IS TO CACHING QUESTION THAT HAS BEEN ASKED FOR SAVE CREDIT USING API VECTOR EMBED AND CHATGPT
import mongoose, { Schema, Types } from "mongoose";

export interface ISearchs {
  user: Types.ObjectId;
  ask: string;
  answer: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const searchsSchema = new mongoose.Schema<ISearchs>({
  user: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
  ask: { type: String, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export default mongoose.models.Searchs ||
  mongoose.model<ISearchs>("Searchs", searchsSchema);
