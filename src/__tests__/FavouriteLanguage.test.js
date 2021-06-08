import React from "react";
import { screen, render } from "@testing-library/react";
import FavouriteLanguage from "./../FavouriteLanguage.js";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";

describe("FavouriteLanguage", () => {
  it("renders intro text when app loads", () => {
    render(<FavouriteLanguage />);
    const linkElement = screen.getByText(
      /Find a user's favourite programming language/i
    );
    expect(linkElement).toBeInTheDocument();
  });

  it("Submit button should make a fetch request return a given Github user.", () => {
    render(<FavouriteLanguage />);
    let mock = new MockAdapter(axios);
    userEvent.click(screen.getByText("Submit"));
    const searchGithubUsers = mock.onGet(
      `https://api.github.com/users/thatguy560/repos?per_page=100`,
      { language: "JavaScript" }
    );
    expect(searchGithubUsers).toHaveBeenCalled();
  });
});
