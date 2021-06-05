import { Component } from "react";
import React from "react";
import axios from "axios";
import "./FavouriteLanguage.css";
import { render } from "@testing-library/react";

class FavouriteLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programmingLanguages: [],
    };
  }

  // Have an input field where you can type in the Github username
  // you're looking for

  // Will get it to retrieve from API first and then change this after
  getData = () => {
    axios
      .get(`https://api.github.com/users/thatguy560/repos?per_page=100`)
      .then((res) => {
        const programmingLanguagesList = res.data;
        console.log(
          programmingLanguagesList
            .map((lang) => lang.language)
            .filter((lang) => lang === "JavaScript")
        );
      })
      .catch((error) => {
        console.log("ERROR");
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>What is your favourite programming language?</h1>
          <p>Please enter a valid Github username:</p>
          <button type="button" className="btn" onClick={this.getData}>
            Get Data
          </button>
        </header>
      </div>
    );
  }
}

export default FavouriteLanguage;

// https://api.github.com/users/${username}/repos?per_page=100
