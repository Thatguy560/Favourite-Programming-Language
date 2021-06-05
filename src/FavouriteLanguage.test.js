import { render, screen } from "@testing-library/react";
import FavouriteLanguage from "./FavouriteLanguage";

test("renders intro text when app loads", () => {
  render(<FavouriteLanguage />);
  const linkElement = screen.getByText(
    /What is your favourite programming language?/i
  );
  expect(linkElement).toBeInTheDocument();
});

// https://api.github.com/users/${username}/repos?per_page=100
