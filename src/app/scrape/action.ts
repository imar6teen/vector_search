"use server";
import dbConnect from "@/lib/dbConnect";
import scrape from "@/lib/scrape";
import vectorEmbed from "@/lib/vectorEmbed";
import Scrape, { IScrapes } from "@/models/Scrapes";
import { getServerSession } from "next-auth";
import { ZodError, z } from "zod";
import mongoose from "mongoose";
import authOptions from "../api/auth/[...nextauth]/authOptions";

const schema = z.object({
  url: z.string().url("Invalid URL using http:// or https://"),
});

export default async function action(_: any, formData: FormData) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    // @ts-ignore
    const userId = new mongoose.Types.ObjectId(session?.user.id);

    const values = Object.fromEntries(formData.entries());
    const { url } = schema.parse(values);

    const scraped: IScrapes | null = await Scrape.findOne({ url });

    if (scraped) {
      const dupScrape = new Scrape({
        user: userId,
        url,
        text: scraped.text,
        vectorize: scraped.vectorize,
      });
      await dupScrape.save();
    } else {
      const scrapeResult = await scrape(url);

      const vector = await vectorEmbed(scrapeResult);

      if (vector.status !== 200) throw new Error(vector.data);

      const vectorScrapeResult = new Scrape({
        user: userId,
        url,
        text: scrapeResult,
        vectorize: vector.data.openai.items[0].embedding,
      });
      await vectorScrapeResult.save();
    }

    return {
      event: "success",
      message: "scrape success",
    };
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      return {
        event: "zoderror",
        message: err.errors[0].message,
      };
    }
    return {
      event: "error",
      message: "error",
    };
  }
}
