import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { getResultJson } from "../lib/cloudStorageUtils";
import { reviewResume } from "../lib/chatGPTApi";
import dynamic from "next/dynamic";

import Result from "../components/result";

const bucketName = "resume_reviewer";
const resumeCategory = "software engineering";

const PDFViewer = dynamic(() => import("../components/pdfViewer.js"), {
  ssr: false,
});

export async function getStaticProps() {
  const file = "software-engineer-1527758966.pdf";
  const fileNameWithoutPostfix = file.split(".")[0];
  const jsonString = await getResultJson(bucketName, fileNameWithoutPostfix);
  const texts = jsonString.responses[0].fullTextAnnotation.text;
  return {
    props: {
      texts,
    },
  };
}

export default function Home({ texts }) {
  const [resultResume, setResultResume] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const MyDocument = () => (
    <Document>
      <Document onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
    </Document>
  );

  async function onResumeSubmit(event) {
    event.preventDefault();
    setResultResume(`Loading...`);
    try {
      const reviewedResume = await reviewResume(texts, resumeCategory);
      setResultResume(reviewedResume);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
      setResultResume("Error");
    }
  }
  return (
    <>
      <Head>
        <title>Gary's Resume Reviewer</title>
        <meta name="description" content="Resume Reviewer Powered by GPT-3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.title}>
          <p>Resuzzme Reviewer</p>
        </div>

        <div>
          <h2 className={styles.headingLg}>Resume: </h2>
          <PDFViewer />
          <form
            onSubmit={async (e) => {
              onResumeSubmit(e);
            }}
          >
            <button type="submit">Submit Resume</button>
          </form>
        </div>
        <div></div>

        <div>
          <h2 className={styles.headingLg}>Improved Texts: </h2>
          <Result text={resultResume} />
        </div>
      </main>
    </>
  );
}
