"use server";
import scrape from "@/lib/scrape";
import { ZodError, z } from "zod";

const schema = z.object({
  url: z.string().url("Invalid URL using http:// or https://"),
});

export default async function action(_: any, formData: FormData) {
  try {
    const values = Object.fromEntries(formData.entries());
    const { url } = schema.parse(values);

    const scrapeResult = await scrape(url);
    return {
      event: "success",
      message: scrapeResult,
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
