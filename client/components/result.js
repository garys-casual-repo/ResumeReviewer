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
        <p className={styles.normalText}>{this.props.text}</p>
      </div>
    );
  }
}
