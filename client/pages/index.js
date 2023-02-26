import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

import { getResultJson } from "../lib/cloudStorageUtils";
import { reviewResume } from "../lib/chatGPTApi";

import Result from "../components/result";

const bucketName = "resume_reviewer";

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
  const [resultResume, setResultResume] = useState(["loading"]);
  async function onResumeSubmit(event) {
    event.preventDefault();

    try {
      const reviewedResume = await reviewResume(texts);
      console.log(reviewedResume.length);
      setResultResume(reviewedResume);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
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
          <h2 className={styles.headingLg}>Texts in Resume: </h2>
          <p className={styles.normalText}>{texts}</p>
          <form
            onSubmit={async (e) => {
              onResumeSubmit(e);
            }}
          >
            <button type="submit">Submit Resume</button>
          </form>
        </div>

        <div>
          <h2 className={styles.headingLg}>Improved Texts: </h2>
          <Result texts={resultResume} />
        </div>
      </main>
    </>
  );
}
