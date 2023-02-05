const { Storage } = require("@google-cloud/storage");

// Creates a client
const storage = new Storage();
export async function getResultJson(bucketName, fileName) {
  //resume_reviewer/results/Gary Zhou_Resume_20221005_output-1-to-1.json
  const sourceFileName = "results/" + fileName + "_output-1-to-1.json";
  const destFileName = `./public/${fileName}`;
  const options = {
    destination: destFileName,
  };

  // Downloads the file
  await storage.bucket(bucketName).file(sourceFileName).download(options);
}
