"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import answer from "@/lib/answer";
import dbConnect from "@/lib/dbConnect";
import vectorEmbed from "@/lib/vectorEmbed";
import Search from "@/models/Search";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

import { ZodError, z } from "zod";
import { fullTextSearch, getRelatedScrapes } from "@/lib/dbMethod";

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

    const session = await getServerSession(authOptions);
    const values = Object.fromEntries(formData.entries());

    const { ask } = schema.parse(values);

    // @ts-ignore
    const userId = new mongoose.Types.ObjectId(session?.user.id);

    const isSearchExist = await fullTextSearch(ask, userId);

    console.log(
      `${isSearchExist.length > 0 && isSearchExist[0].score.value > 0.7 ? "get answer from database" : "answer not exist in database"}`,
    );

    if (isSearchExist.length > 0 && isSearchExist[0].score.value > 0.7)
      return {
        event: "success",
        message: isSearchExist[0].answer,
      };

    const vector = await vectorEmbed(ask);

    if (vector.status !== 200) throw new Error(vector.data);

    const result = await getRelatedScrapes(
      vector.data.openai.items[0].embedding,
      userId,
    );

    if (result[0].score < 0.7) result[0].text = "Context is not exist";

    const answerResult = await answer(result[0].text, ask);

    if (answerResult.status !== 200) throw new Error(vector.data);

    if (result[0].score >= 0.7)
      await new Search({
        user: userId,
        ask: ask,
        answer: answerResult.data.openai.generated_text,
      }).save();

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
