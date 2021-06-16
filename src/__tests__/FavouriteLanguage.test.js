import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Swal from "sweetalert2";
import "@testing-library/jest-dom";
import FavouriteLanguage from "./../FavouriteLanguage.js";
import mockAxios from "./../utils/mockAxios.js";

// Spying on Swal.fire, turning into a "spy" mocked function.
const mockSpy = jest.spyOn(Swal, "fire");
// example username given to be submitted.
const username = "example-user-name";
const API_URL = `https://api.github.com/users/${username}/repos?per_page=100`;

// Chaining Axios responses
mockAxios
  .onGet(API_URL)
  .replyOnce(404) // At first it fails to fetch and returns a 404 ERROR.
  .onGet(API_URL)
  .replyOnce(503) // Fails again but returns any other error that's not a 404.
  .onGet(API_URL)
  .reply(200, [{ language: "Javascript" }]);
// Then it successfully returns an array of objects, where each
// object refers to the user's projects; in example I'm just
// returning a single project.

beforeEach(() => {
  mockSpy.mockClear(); // Clear any previous calls to this spy mock
});

afterAll(() => {
  mockSpy.mockRestore(); // Restore spy mock to original Swal.fire
});

describe("FavouriteLanguage", () => {
  it("Renders intro text when the app loads", () => {
    render(<FavouriteLanguage />);
    const linkElement = screen.getByText(
      /Find a user's favourite programming language/i
    );
    expect(linkElement).toBeInTheDocument();
  });

  it("Fails to make an API request to retrieve a github user if the user doesn't exist and displays a 404 error.", async () => {
    render(<FavouriteLanguage />);
    // Updates input with "example" username
    userEvent.type(screen.getByTestId("Username"), username);
    // Submits the form
    userEvent.click(screen.getByTestId("Submit"));
    // Using "waitFor" because submitting the from calls an async
    // request, therefore you need to "waitFor" the request to resolve.
    await waitFor(() => {
      // Expect Swal.fire to be called with an error.
      expect(Swal.fire).toHaveBeenCalledWith({
        title: "<404 Error> Github User Not Found",
        icon: "error",
      });
    });
  });

  it("Fails to make an API request if there's any other HTTP response errors and will display 'Something Went Wrong'.", async () => {
    render(<FavouriteLanguage />);
    userEvent.type(screen.getByTestId("Username"), username);
    userEvent.click(screen.getByTestId("Submit"));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        title: "Something Went Wrong :(",
        icon: "error",
      });
    });
  });

  it("Makes an API request to retrieve a github user's details and displays a sweet alert with a user's favorite language.", async () => {
    render(<FavouriteLanguage />);
    userEvent.type(screen.getByTestId("Username"), username);
    userEvent.click(screen.getByTestId("Submit"));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        title: "Example-user-name's Favourite Programming Language Is:",
        text: "Javascript",
        width: 625,
      });
    });
  });
});
