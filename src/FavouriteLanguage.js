import { Component } from "react";
import React from "react";
import axios from "axios";
import "./FavouriteLanguage.css";
import { render } from "@testing-library/react";

class FavouriteLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedUsername: "",
      programmingLanguages: [],
    };
  }

  searchGithubUsers = (event) => {
    this.setState({ searchedUsername: event.target.value });
  };

  getData = (event) => {
    event.preventDefault();
    let url = `https://api.github.com/users/${this.state.searchedUsername}/repos?per_page=100`;
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        const allData = res.data;
        const programmingLanguagesUsed = allData.map((lang) => lang.language);
        console.log(programmingLanguagesUsed);
      })
      .catch((error) => {
        console.log(this.DisplayErrorInfo(error));
      });
  };

  DisplayErrorInfo = (error) => {
    return error.response.status === 404
      ? "404 Github Username Not Found"
      : "Something Went Wrong";
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>What is your favourite programming language?</h1>
          <p>Please enter a valid Github username:</p>
          <form onSubmit={this.getData}>
            <input
              type="text"
              placeholder="Github username..."
              value={this.state.searchedUsername} // Do I need this?
              onChange={this.searchGithubUsers}
            />
          </form>
          <button type="button" className="btn" onClick={this.getData}>
            Get Data
          </button>
        </header>
      </div>
    );
  }
}

export default FavouriteLanguage;
