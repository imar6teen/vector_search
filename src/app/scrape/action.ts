"use server";
import dbConnect from "@/lib/dbConnect";
import scrape from "@/lib/scrape";
import Scrape from "@/models/Scrapes";
import { ZodError, z } from "zod";
import api from "api";
const sdk = api("@eden-ai/v2.0#z88s1rlrqgbas5");

const schema = z.object({
  url: z.string().url("Invalid URL using http:// or https://"),
});

export default async function action(_: any, formData: FormData) {
  try {
    await dbConnect();
    sdk.auth(process.env.EDENAI_KEY as string);

    const values = Object.fromEntries(formData.entries());
    const { url } = schema.parse(values);

    const scrapeResult = await scrape(url);

    const vectorEmbed = await sdk.text_embeddings_create({
      response_as_dict: true,
      attributes_as_list: false,
      show_original_response: false,
      texts: [scrapeResult],
      providers: "openai",
    });

    if (vectorEmbed.status !== 200) throw new Error(vectorEmbed.data);

    const vectorScrapeResult = new Scrape({
      text: scrapeResult,
      vectorize: vectorEmbed.data.openai.items[0].embedding,
    });
    await vectorScrapeResult.save();

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
