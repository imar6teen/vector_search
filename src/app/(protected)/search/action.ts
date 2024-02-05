"use server";
import answer from "@/lib/answer";
import dbConnect from "@/lib/dbConnect";
import vectorEmbed from "@/lib/vectorEmbed";
import Scrapes from "@/models/Scrapes";

import { ZodError, z } from "zod";

const schema = z.object({
  ask: z
    .string({
      invalid_type_error: "Question must be a string",
      required_error: "Question is required",
    })
    .trim()
    .toLowerCase(),
});

export default async function action(_: any, formData: FormData) {
  try {
    await dbConnect();

    const values = Object.fromEntries(formData.entries());

    const { ask } = schema.parse(values);

    const vector = await vectorEmbed(ask);

    if (vector.status !== 200) throw new Error(vector.data);

    const pipelineStage: any[] = [
      {
        $vectorSearch: {
          index: "embed_index",
          path: "vectorize",
          queryVector: vector.data.openai.items[0].embedding,
          limit: 5,
          numCandidates: 200,
        },
      },
    ];

    const result = await Scrapes.aggregate(pipelineStage);

    const answerResult = await answer(result[0].text, ask);

    if (answerResult.status !== 200) throw new Error(vector.data);

    return {
      event: "success",
      message: answerResult.data.openai.generated_text,
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
