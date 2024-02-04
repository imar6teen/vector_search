"use server";
import { ZenRows } from "zenrows";

export default async function scrape(url: string) {
  const client = new ZenRows(process.env.ZENROWS_API_KEY as string);

  const { data } = await client.get(url, {
    css_extractor: '{"article":"article"}',
  });

  return data.article.replace(/\n/g, "").replace(/\s\s+/g, " ");
}
