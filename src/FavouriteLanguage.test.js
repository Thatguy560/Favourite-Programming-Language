import { render, screen } from "@testing-library/react";
import FavouriteLanguage from "./FavouriteLanguage";

test("renders intro text when app loads", () => {
  render(<FavouriteLanguage />);
  const linkElement = screen.getByText(
    /What is your favourite programming language?/i
  );
  expect(linkElement).toBeInTheDocument();
});

// Tests still work (Once app is finished with, attempt
// to make some of your tests with the app. )
