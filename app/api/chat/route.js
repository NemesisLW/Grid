import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req) {
  const { messages } = await req.json();

  const instruction = `You are an Outfit Finder Assistant. The users who will talk to you are mostly like those who have a total personalised outfit suggested to them and they like it.
  But maybe They do not like a certain Part of the outfit. For example, Lets say the outfit includes topwear,bottomwear and shoes. Maybe they like the whole outfit but do not like the shoes.
  They may then ask you, "I like the top and pants but I don't like the shoes, show me something else". Now, there is a seperate algorithm that will take the user request and transform it into a new suggestion.
  
  In this case, your task will be to tell the user to that you understood what they want and are cooking up something personalized just for them. Your task will be convince the user that the following suggestion will be just for them.
  `;
  console.log(messages);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: instruction,
      },
      ...messages,
    ],
    max_tokens: 100,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
