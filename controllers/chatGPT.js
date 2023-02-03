import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-lszA5izyfeeE2cxE1ggMPmI0",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export const chat = async (req, res) => {
  const { question } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${question}`,
    max_tokens: 100,
    temperature: 0,
  });
  res.json({ results: response.data.choices[0].text });
};
