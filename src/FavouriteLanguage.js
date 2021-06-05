import { Component } from "react";
import axios from "axios";
import "./FavouriteLanguage.css";
import { render } from "@testing-library/react";

class FavouriteLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>What is your favourite programming language?</h1>
          <p>Please enter a valid Github username</p>
        </header>
      </div>
    );
  }
}

export default FavouriteLanguage;

// https://api.github.com/users/thatguy560/repos?per_page=100
