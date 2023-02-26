import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function reviewResume(resumeTextInput, resumeCategory) {
  const resumeText = resumeTextInput || "";
  if (resumeText.trim().length === 0) {
    alert("No text detected in resume");
  }
  const editResume = await openai.createEdit({
    model: "text-davinci-edit-001",
    input: resumeText,
    instruction: generatePrompt(resumeCategory),
  });
  const result = editResume.data.choices[0].text;

  const formattedResume = await openai.createEdit({
    model: "text-davinci-edit-001",
    input: result,
    instruction: "Format the resume in Markdown",
  });
  return formattedResume.data.choices[0].text;
}

function generatePrompt(resumeCategory) {
  return `Improve the ${resumeCategory} resume`;
}
