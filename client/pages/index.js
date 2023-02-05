import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Image from "next/image";

import examplePic from "../public/wakeupcat.jpg";
import { readImg, readDocument } from "../lib/cloudVision";
import { getResultJson } from "../lib/cloudStorageUtils";

const imgFile = "./public/wakeupcat.jpg";
const bucketName = "resume_reviewer";

export async function getStaticProps() {
  const texts = await readImg(imgFile);
  const file = "Gary Zhou_Resume_20221005.pdf";
  const fileNameWithoutPostfix = file.split(".")[0];
  readDocument(bucketName, file);
  getResultJson(bucketName, fileNameWithoutPostfix);
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
          <Image src={examplePic} alt="Example Pic" />
          <h2 className={styles.headingLg}>Texts in Image: </h2>
          <p className={styles.normalText}>{texts[0].description}</p>
        </div>
      </main>
    </>
  );
}
