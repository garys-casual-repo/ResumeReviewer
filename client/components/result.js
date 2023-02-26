import styles from "@/styles/Home.module.css";
import React, { Component } from "react";
import dynamic from "next/dynamic";
import parse from "html-react-parser";
// import ReactMarkdown from "react-markdown";
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

export default class Result extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const text = parse(this.props.text);
    return (
      <div>
        <ReactMarkdown children={this.props.text}></ReactMarkdown>

        {/* <p className={styles.normalText}>{this.props.text}</p> */}
      </div>
    );
  }
}
