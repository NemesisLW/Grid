import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";
import { Prompt } from "next/font/google";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request) {
  const req = await request.json();
  const userRequest = req.currentRequest;
  const filterJSON = await generate(userRequest);

  try {
    return NextResponse.json({ filter: filterJSON }, { status: 200 });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return NextResponse.json({ error: error.response.data }, { status: 500 });
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return NextResponse.json(
        { error: "An error occurred during your request." },
        { status: 500 }
      );
    }
  }
}

const generate = async (prompt) => {
  const instructions = `Act as if you are an Outfit Advisor.

  The users are suggested an outfit based on their preference and demographics using a separate Machine Learning Algorithm. Now, They might like the suggestion but may want to change a part of it.
  
  For example, if a outfit consists of the top wear, bottom wear and shoe, Lets say the user likes the top and  the bottom wear and wants a different shoe but can not articulate exactly what they want.
  
  Your task will be to take the user's preference and demographic and their unorganized request and transform it and generate organized Filter Search Query conditions, which be used to search for the perfect product in the inventory.
  
  Remember, Your Response will have to formatted in the following way, as a JSON Object.
  In our Database, there are only the following key values present:
  id, name, brand, type, outfit-type, size, color, price
  
  Make sure the JSON you generate does not content any other key except from the above mentioned.
  
  For Example, 
  If the organized request might  be like - "I want a Blue color Adidas shoe, under 650 rupees", then your output should be:
  
  {price: "<650", "color": blue, "brand": "Adidas", "outfit-type": "shoe"}
  
  ,
  `;

  const userPrompt = `
  Now here are the details and the request by the user:
  
  User Details: "User Likes the colour Blue, Also Diwali is around, Likes Branded accessories."
  
  User Request: ${prompt}
  
  Remember, you should NOT ever output any other text other than the JSON Object.
  
  The JSON Object:`;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: instructions },
      { role: "user", content: userPrompt },
    ],
  });
  console.log(completion.data.choices[0].message.content);
  return completion.data.choices[0].message.content;
};
