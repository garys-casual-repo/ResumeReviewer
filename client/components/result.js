import styles from "@/styles/Home.module.css";
import React, { Component } from "react";
import dynamic from "next/dynamic";
import parse from "html-react-parser";
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

export default class Result extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ReactMarkdown children={this.props.text}></ReactMarkdown>
      </div>
    );
  }
}
