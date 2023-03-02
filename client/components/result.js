import React, { Component } from "react";
import dynamic from "next/dynamic";
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
