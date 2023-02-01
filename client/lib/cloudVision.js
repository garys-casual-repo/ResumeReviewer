// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export async function readImg(fileName) {
  const vision = require("@google-cloud/vision");
  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs text detection on the local file
  const [result] = await client.textDetection(fileName);
  const detections = result.textAnnotations;
  console.log(detections);
  return detections;
}
