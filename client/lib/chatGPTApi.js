import { Configuration, OpenAIApi } from "openai";
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
  return completion.data.choices;
}

function generatePrompt(resumeText) {
  return `Please review the following resume 
  ${resumeText} 
  and return a improved version of the resume.
  Please also list out the things that need to be improved for the resume.`;
}
