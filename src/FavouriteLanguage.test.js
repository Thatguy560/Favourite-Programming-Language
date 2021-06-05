import { render, screen } from "@testing-library/react";
import FavouriteLanguage from "./FavouriteLanguage";

test("renders learn react link", () => {
  render(<FavouriteLanguage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// Tests still work (Once app is finished with, attempt
// to make some of your tests with the app. )
