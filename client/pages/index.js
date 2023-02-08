import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Image from "next/image";

import { getResultJson } from "../lib/cloudStorageUtils";
import { reviewResume } from "../lib/chatGPTApi";

const bucketName = "resume_reviewer";

export async function getStaticProps() {
  const file = "Gary Zhou_Resume_20221005.pdf";
  const fileNameWithoutPostfix = file.split(".")[0];
  const jsonString = await getResultJson(bucketName, fileNameWithoutPostfix);
  const texts = jsonString.responses[0].fullTextAnnotation.text;
  const reviewedResume = reviewResume(texts);
  console.log(reviewedResume);
  return {
    props: {
      texts,
    },
  };
}

export default function Home({ texts }) {
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
          <p>Rizzme Reviewer</p>
        </div>

        <div>
          <h2 className={styles.headingLg}>Texts in Resume: </h2>
          <p className={styles.normalText}>{texts}</p>
        </div>
      </main>
    </>
  );
}
