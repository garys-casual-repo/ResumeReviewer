import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function reviewResume(resumeTextInput) {
  const resumeText = resumeTextInput || "";
  if (resumeText.trim().length === 0) {
    alert("No text detected in resume");
  }
  const edit = await openai.createEdit({
    model: "text-davinci-edit-001",
    input: resumeText,
    instruction: generatePrompt(),
  });
  console.log(edit);
  const result = edit.data.choices[0].text;
  return result;
}

function generatePrompt() {
  return `Edit the resume to attract HR`;
}
