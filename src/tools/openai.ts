'use server';

//server side code to avoid exposing the API key to the client

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getSimilarity(
  todoArr: string[],
  doneArr: string[],
  str: string,
) {
  const result = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'Return the strings in the array the most in common with the string in input return only the strings whatever the language is. The output will be formatted as follows: [<string>], you can return multiple string if needed.',
      },
      {
        role: 'user',
        content:
          'TodoArray: ' +
          todoArr.join(', ') +
          ' DoneArray ' +
          doneArr.join(', ') +
          ' String: ' +
          str,
      },
    ],
    max_tokens: 40,
    model: 'gpt-3.5-turbo',
    temperature: 0,
  });

  console.log(result.choices[0].message.content);

  return result.choices[0].message.content;
}
