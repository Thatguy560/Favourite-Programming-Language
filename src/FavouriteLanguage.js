import { Component } from "react";
import axios from "axios";
import sortKeysByValue from "sort-keys-by-value";
import Swal from "sweetalert2";
import "./css/FavouriteLanguage.css";

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

  getData = (e) => {
    e.preventDefault();
    const username = this.state.searchedUsername;
    axios
      .get(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then((res) => {
        const allProgrammingLanguages = res.data
          .map((data) => data.language)
          .filter((lang) => lang !== null);
        this.setState({ programmingLanguagesUsed: allProgrammingLanguages });
        Swal.fire({
          title: `${
            username[0].toUpperCase() + username.slice(1).toLowerCase()
          }'s Favourite Programming Language Is:`,
          text: `${this.determineFavouriteLanguage()}`,
          width: 625,
        });
      })
      .catch((error) => {
        Swal.fire({
          title: `${this.DisplayErrorInfo(error)}`,
          icon: "error",
        });
      });
  };

  determineFavouriteLanguage = () => {
    let languageFrequency = {};
    this.state.programmingLanguagesUsed.forEach((lang) => {
      if (!languageFrequency[lang]) {
        languageFrequency[lang] = 0;
      }
      languageFrequency[lang]++;
    });
    const sortByMostUsed = sortKeysByValue(languageFrequency, {
      reverse: true,
    });
    const sortedLangsUsedFreq = Object.values(sortByMostUsed);
    const sortedLangsUsed = Object.keys(sortByMostUsed);
    const maxValueFreq = sortedLangsUsedFreq[0];
    const numOfFavLanguages = sortedLangsUsedFreq.lastIndexOf(maxValueFreq) + 1;
    if (this.state.programmingLanguagesUsed.length === 0) {
      return `${this.state.searchedUsername} doesn't have any code on any public repositories.`;
    } else {
      return `${sortedLangsUsed.slice(0, numOfFavLanguages).join(" or ")}`;
    }
  };

  DisplayErrorInfo = (HTTP) => {
    return HTTP.response.status === 404
      ? "<404 Error> Github User Not Found"
      : "Something Went Wrong :(";
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
                data-testid="Username"
                type="text"
                placeholder="Github username..."
                onChange={this.searchGithubUsers}
              />
              <br />
              <button
                id="Submit"
                data-testid="Submit"
                type="button"
                className="btn"
                onClick={this.getData}
              >
                Submit
              </button>
            </form>
          </div>
        </header>
      </div>
    );
  }
}

export default FavouriteLanguage;
