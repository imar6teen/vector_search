import mongoose from "mongoose";

interface IScrapes {
  vectorize: number[];
  text: string;
}

const scrapesSchema = new mongoose.Schema<IScrapes>({
  text: { type: String, required: true },
  vectorize: { type: [Number], required: true },
});

const Scrapes = mongoose.model<IScrapes>("Scrapes", scrapesSchema);

export default Scrapes;
