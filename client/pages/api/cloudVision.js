// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function readImg(fileName) {
  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs text detection on the local file
  const [result] = await client.textDetection(fileName);
  const detections = result.textAnnotations;
  console.log("Text:");
  detections.forEach((text) => console.log(text));
}
