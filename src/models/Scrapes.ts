import mongoose, { Schema, Types } from "mongoose";

export interface IScrapes {
  user: Types.ObjectId;
  url: string;
  vectorize: number[];
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const scrapesSchema = new mongoose.Schema<IScrapes>({
  user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  url: { type: String, required: true },
  text: { type: String, required: true },
  vectorize: { type: [Number], required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export default mongoose.models.Scrapes ||
  mongoose.model<IScrapes>("Scrapes", scrapesSchema);
