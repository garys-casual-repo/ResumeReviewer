import { Configuration, OpenAIApi } from "openai";

const dotenv = require("dotenv");
dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function reviewResume(resumeTextInput) {
  const resumeText = resumeTextInput || "";
  if (resumeText.trim().length === 0) {
    alert("No text detected in resume");
  }
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(resumeText),
    temperature: 0.6,
  });
  return completion.data.choices[0].text;
}

function generatePrompt(resumeText) {
  return `Please review the following resume 
  ${resumeText} 
  and return the improved resume as jsx component to be displayed on a
  web App. Example of jsx component:
    <Head>
      <title>Gary's Resume Reviewer</title>
    </Head>`;
}
