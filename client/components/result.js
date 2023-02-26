import styles from "@/styles/Home.module.css";
import React, { Component } from "react";

export default class Result extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        {this.props.texts.map((line) => {
          return <p className={styles.normalText}>{line}</p>;
        })}
      </div>
    );
  }
}
