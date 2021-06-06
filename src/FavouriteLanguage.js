import { Component } from "react";
import axios from "axios";
import sortKeysByValue from "sort-keys-by-value";
import Swal from "sweetalert2";
import "./FavouriteLanguage.css";
// import { render } from "@testing-library/react";

class FavouriteLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedUsername: "",
      programmingLanguagesUsed: "",
    };
  }

  searchGithubUsers = (event) => {
    this.setState({ searchedUsername: event.target.value });
  };

  getData = () => {
    let username = this.state.searchedUsername;
    axios
      .get(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then((res) => {
        let allProgrammingLanguages = res.data
          .map((data) => data.language)
          .filter((lang) => lang !== null);
        this.setState({ programmingLanguagesUsed: allProgrammingLanguages });
        this.calculateMostUsedLanguage();
        Swal.fire({
          title: `${
            username[0].toUpperCase() + username.slice(1)
          }'s Favourite Programming Language Is:`,
          text: `${this.state.FavouriteLanguage}`,
          width: 600,
        });
      })
      .catch((error) => {
        Swal.fire(`${this.DisplayErrorInfo(error)}`);
      });
  };

  DisplayErrorInfo = (error) => {
    return error.response.status === 404
      ? "404 Github User Not Found"
      : "Something Went Wrong";
  };

  calculateMostUsedLanguage = () => {
    let languageFrequency = {};
    this.state.programmingLanguagesUsed.forEach((lang) => {
      if (!languageFrequency[lang]) {
        languageFrequency[lang] = 0;
      }
      languageFrequency[lang]++;
    });
    let sortByMostUsed = sortKeysByValue(languageFrequency, { reverse: true });
    console.log(sortByMostUsed);
    let MostUsedLanguage = Object.keys(sortByMostUsed)[0];
    let determineMessage =
      this.state.programmingLanguagesUsed.length === 0
        ? `${this.state.searchedUsername} doesn't have any code on any public repositories.`
        : `${MostUsedLanguage}`;
    this.setState({
      FavouriteLanguage: determineMessage,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div id="wrap">
            <h2>Find a user's favourite programming language</h2>
            <p>Please enter a valid Github username:</p>
            <form onSubmit={this.getData}>
              <input
                type="text"
                placeholder="Github username..."
                onChange={this.searchGithubUsers}
              />
            </form>
            <button
              id="Submit"
              type="button"
              className="btn"
              onClick={this.getData}
            >
              Submit
            </button>
          </div>
        </header>
      </div>
    );
  }
}

export default FavouriteLanguage;
