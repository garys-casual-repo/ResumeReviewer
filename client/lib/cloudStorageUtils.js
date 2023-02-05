const { Storage } = require("@google-cloud/storage");

// Creates a client
const storage = new Storage();
export async function getResultJson(bucketName, fileName) {
  const sourceFileName = "results/" + fileName + "_output-1-to-1.json";

  // Downloads the file
  const file = await storage.bucket(bucketName).file(sourceFileName).download();
  return JSON.parse(file[0].toString("utf8"));
}
