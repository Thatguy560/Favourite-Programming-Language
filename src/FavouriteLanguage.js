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
    this.setState({ searchedUsername: event.target.value }); // Set this.state.searchedUsername to whatever user info is passed into the input box.
  };

  getData = () => {
    let username = this.state.searchedUsername;
    axios // Use Axios to make a fetch request and passes in provided username to get relevant data
      .get(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then((res) => {
        let allProgrammingLanguages = res.data
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
    let sortByMostUsed = sortKeysByValue(languageFrequency, { reverse: true });
    let sortedLangsUsedFreq = Object.values(sortByMostUsed);
    let sortedLangsUsed = Object.keys(sortByMostUsed);
    let maxValueFreq = sortedLangsUsedFreq[0];
    let numOfFavLanguages = sortedLangsUsedFreq.lastIndexOf(maxValueFreq) + 1; // if user hasn't used any programming languages return "doesn't have any code" else return favourite programming language(s) used.
    if (this.state.programmingLanguagesUsed.length === 0) {
      return `${this.state.searchedUsername} doesn't have any code on any public repositories.`;
    } else {
      return `${sortedLangsUsed.slice(0, numOfFavLanguages).join(" or ")}`; // Takes sorted languages, slices based on languages used, e.g. if user has used Ruby or JS equal number of times it will return both.
    }
  };

  DisplayErrorInfo = (HTTP) => {
    return HTTP.response.status === 404 // if HTTP response status is 404 then return page not found error else return any other client or server errors.
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
