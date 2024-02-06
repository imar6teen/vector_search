"use server";
import api from "api";
import { cache } from "react";

const sdk = api("@eden-ai/v2.0#z88s1rlrqgbas5");

const answer = cache(async (context: string, question: string) => {
  sdk.auth(process.env.EDENAI_KEY as string);
  const answer = await sdk.text_chat_create({
    response_as_dict: true,
    attributes_as_list: false,
    show_original_response: false,
    temperature: 0,
    max_tokens: 1000,
    previous_history: [
      {
        role: "user",
        message:
          "I will give you some context and I want you to answer based on that as short as possible. And please if you do not know, just say don't know. If you uncertain which answer you want to give, just answer it",
      },
      {
        role: "assistant",
        message:
          "I will answer based on the context only. If the context irrelevant with the question, I will answer 'The context is irrelevant or there is no context match with question, please scrape'",
      },
      {
        role: "user",
        message: `Based on this context : ${context}`,
      },
    ],
    text: question,
    providers: "openai",
  });

  return answer;
});

export default answer;
