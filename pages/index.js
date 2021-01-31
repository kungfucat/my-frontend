import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from "react";
import Axios from "axios";
import axios from "axios";

const FileDownload = require('js-file-download');

export default function Home() {

  //React hooks to get the current text block
  const [textBlock, setTextBlock] = useState("");
  const [disableInputs, setDisableInputs] = useState(false);

  const downloadFile = async () => {
    axios.get("http://localhost:8000/reports", {params: {textBlock: textBlock}, responseType:'blob'}).then(function (response){
      FileDownload(response.data, 'report.docx');
    });
  }
  const submitHandler = (e) => {

    if (disableInputs) {
      return;
    }
    //do not refresh
    e.preventDefault();
    console.log(textBlock);
    setDisableInputs(true);
    downloadFile().then(r => setDisableInputs(false));
  }

  return (
      <div className={styles.container}>
        <Head>
          <title>Word Doc Converter</title>
          <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Convert text to a Word Document!
          </h1>
          <textarea name = "textBlock" id = "textBlock" className={styles.textBlock} disabled= {disableInputs} onChange={(e) => setTextBlock(e.target.value)}/>
          <button id="submitButton" className={styles.submitButton} onClick={submitHandler} disabled={disableInputs}>
            {disableInputs? "Please wait": "Submit"}</button>
        </main>

        <footer className={styles.footer}>
          <a
              href="https://hb11.me/#home"
              target="_blank"
              rel="noopener noreferrer">
            Created by Harsh Bhardwaj
          </a>
        </footer>
      </div>
  )
}

//npm run dev