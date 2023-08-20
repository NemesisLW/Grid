import { SequentialChain, LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { NextResponse } from "next/server";

const llm = new OpenAI({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo",
});

export async function POST(request) {
  const req = await request.json();
  const userRequest = req.currentUserRequest;
  const result = await generate(userRequest);

  try {
    return NextResponse.json({ filter: result.filterSearch }, { status: 200 });
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

const formatRequestTemplate = `
# MAIN PURPOSE
You are an Outfit Advisor. The USER will likely provide with a request to ask for changes in the current outfit that they are suggested. You will rewrite and reformat those request so that they will be more clear, direct, and precise. Your formatted response will then be forwarded to an Searching Machine that takes in a text request to search for the required outfit from the existing database. Optimize them so that you would understand them best. 

# OUTPUT FORMAT
Your output format should only be the Formatted Request. You should not generate any other text except from the Request that will be forwarded to the searching machine. Any Extra text other than the required will result in a failure of the process.

# RULES
- You should give the user Request  first priority.
- The user request may not always be something concrete as the user may be confused about what they specifically want.  If the details provided in the request is insufficient or unclear, you must consult the provided user details that contain the analytics summary of the user's purchasing history, browsing data, Current Trending Outfits. Other than that,
take into account the user's gender, favorite colors, preferred styles, and any specific clothing items.
 - The Formatted Response must specify the color and type and a price range.

# USER DETAILS
- GENDER: Female
- AGE: 21
- LOCATION: MUMBAI
- Favorite color - Blue

# USER REQUEST

{request}
`;

const jsonFormatTemplate = `
# MAIN PURPOSE
You are an Outfit Searcher. The USER will likely provide with a request to ask for changes in the current outfit that they are suggested. You will reformat those request as a JSON Object. Your formatted response will then be forwarded to an Searching Machine that can only take a JSON Object as an input to search for the required outfit from the existing database.

# OUTPUT FORMAT
Your output format should only be the JSON Object. You should not generate any other text except from the JSON Object that will be forwarded to the searching machine. Any Extra text other than the required will result in a failure of the process.

# RULES
- In our Database, there are only the following key values present:  "id", "name", "brand", "type", "outfit_type", "size", "color", "price".  Make sure the JSON does not contain keys with different names. 
- The JSON Object you generate must have values for the following keys: "outfit_type", "price", "color".
- "outfit_type" key can have only one of the following values: {{"bottomwear", "topwear", "shoes", "jeans", "kurta", "saree"}}
- "price" key should always be a number.

# USER REQUEST
{formattedRequest}
`;

const generate = async (prompt) => {
  const frPromptTemplate = new PromptTemplate({
    template: formatRequestTemplate,
    inputVariables: ["request"],
  });

  const formatChain = new LLMChain({
    llm: llm,
    prompt: frPromptTemplate,
    outputKey: "formattedRequest",
  });

  const jsonPromptTemplate = new PromptTemplate({
    template: jsonFormatTemplate,
    inputVariables: ["formattedRequest"],
  });

  const jsonChain = new LLMChain({
    llm: llm,
    prompt: jsonPromptTemplate,
    outputKey: "filterSearch",
  });

  const searchChain = new SequentialChain({
    chains: [formatChain, jsonChain],
    inputVariables: ["request"],
    outputVariables: ["formattedRequest", "filterSearch"],
    verbose: true,
  });

  const chainExecution = await searchChain.call({
    request: prompt,
  });
  console.log(chainExecution);
  return chainExecution;
};
