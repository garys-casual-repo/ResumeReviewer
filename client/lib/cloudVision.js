// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export async function readImg(fileName) {
  const vision = require("@google-cloud/vision");
  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs text detection on the local file
  const [result] = await client.textDetection(fileName);
  const detections = result.textAnnotations;
  return detections;
}

export async function readDocument(bucketName, fileName) {
  const vision = require("@google-cloud/vision").v1;

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  const outputPrefix = "results";
  const fileNameWithoutPostfix = fileName.split(".");
  const gcsSourceUri = `gs://${bucketName}/${fileName}`;
  const gcsDestinationUri =
    `gs://${bucketName}/${outputPrefix}/${fileNameWithoutPostfix[0]}` + "_";

  const inputConfig = {
    // Supported mime_types are: 'application/pdf' and 'image/tiff'
    mimeType: "application/pdf",
    gcsSource: {
      uri: gcsSourceUri,
    },
  };
  const outputConfig = {
    gcsDestination: {
      uri: gcsDestinationUri,
    },
  };
  const features = [{ type: "DOCUMENT_TEXT_DETECTION" }];
  const request = {
    requests: [
      {
        inputConfig: inputConfig,
        features: features,
        outputConfig: outputConfig,
      },
    ],
  };

  const [operation] = await client.asyncBatchAnnotateFiles(request);
  const [filesResponse] = await operation.promise();
  const destinationUri =
    filesResponse.responses[0].outputConfig.gcsDestination.uri;
  console.log("Json saved to: " + destinationUri);
  return destinationUri;
}
