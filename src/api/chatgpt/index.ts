import { OPENAPI_TOKEN } from '@env';

export const enterPrompt = async (msg: string) => {
  const data = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAPI_TOKEN}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: msg }],
    }),
  });

  const { choices } = await data.json();
  const { content } = choices[0].message;
  return content as string;
};
