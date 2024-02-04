import mongoose from "mongoose";

interface IScrapes {
  vectorize: number[];
  text: string;
}

const scrapesSchema = new mongoose.Schema<IScrapes>({
  text: { type: String, required: true },
  vectorize: { type: [Number], required: true },
});

export default mongoose.models.Scrapes ||
  mongoose.model<IScrapes>("Scrapes", scrapesSchema);
