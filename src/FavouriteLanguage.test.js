import { render, screen } from "@testing-library/react";
import FavouriteLanguage from "./FavouriteLanguage";

test("renders intro text when app loads", () => {
  render(<FavouriteLanguage />);
  const linkElement = screen.getByText(
    /Find a user's favourite programming language/i
  );
  expect(linkElement).toBeInTheDocument();
});
