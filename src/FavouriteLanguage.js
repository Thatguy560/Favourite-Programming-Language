import { Component } from "react";
import axios from "axios";
import sortKeysByValue from "sort-keys-by-value";
import Swal from "sweetalert2";
import "./FavouriteLanguage.css";
import { render } from "@testing-library/react";

class FavouriteLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedUsername: "",
      programmingLanguages: "",
    };
  }

  searchGithubUsers = (event) => {
    this.setState({ searchedUsername: event.target.value });
  };

  getData = () => {
    let user = this.state.searchedUsername;
    axios
      .get(`https://api.github.com/users/${user}/repos?per_page=100`)
      .then((res) => {
        const allData = res.data;
        var programmingLanguagesUsed = allData
          .map((data) => data.language)
          .filter((lang) => lang !== null);
        this.setState({ programmingLanguages: programmingLanguagesUsed });
        this.calculateMostUsedLanguage();
        Swal.fire({
          title: `${
            user[0].toUpperCase() + user.slice(1)
          }'s Favourite Programming Language`,
          text: `${this.state.test}`,
        });
      })
      .catch((error) => {
        console.log(this.DisplayErrorInfo(error));
      });
  };

  calculateMostUsedLanguage = () => {
    let languageFrequency = {};
    [...this.state.programmingLanguages].forEach((lang) => {
      if (!languageFrequency[lang]) {
        languageFrequency[lang] = 0;
      }
      languageFrequency[lang]++;
    });
    let sortedByValue = sortKeysByValue(languageFrequency, { reverse: true });
    let final = Object.keys(sortedByValue)[0];
    console.log(sortedByValue);
    this.setState({ test: final });
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
          <h2>Find a user's favourite programming language</h2>
          <p>Please enter a valid Github username:</p>
          <form onSubmit={this.getData}>
            <input
              type="text"
              placeholder="Github username..."
              value={this.state.searchedUsername} // Do I need this?
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
        </header>
      </div>
    );
  }
}

export default FavouriteLanguage;
