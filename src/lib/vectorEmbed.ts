"use server";
import api from "api";

const sdk = api("@eden-ai/v2.0#z88s1rlrqgbas5");
async function vectorEmbed(text: string) {
  sdk.auth(process.env.EDENAI_KEY as string);

  const vectorEmbed = await sdk.text_embeddings_create({
    response_as_dict: true,
    attributes_as_list: false,
    show_original_response: false,
    texts: [text],
    providers: "openai",
  });

  return vectorEmbed;
}

export default vectorEmbed;
