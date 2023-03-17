import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Homepage from "./Homepage";
import UserContext from "../auth/UserContext";


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Homepage />
      </UserProvider>
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});

describe("Homepage", () => {
  test("renders loggedOutHome when user is not logged in", async () => {
    const search = jest.fn();
    const setLoading = jest.fn();
    const loading = false;
    const currUser = null;
    const favStationInfo = null;

    const { getByText } = render(
      <MemoryRouter>
        <UserContext.Provider value={{ currUser, favStationInfo, loading, setLoading }}>
          <Homepage search={search} />
        </UserContext.Provider >
      </MemoryRouter >
    );

    expect(getByText(/Search Electric Car Chargers Near You/i)).toBeInTheDocument();

    fireEvent.click(getByText(/Quick Search/i));

    await waitFor(() => {
      expect(setLoading).toHaveBeenCalledWith(true);
      expect(search).toHaveBeenCalled();
      expect(setLoading).toHaveBeenCalledWith(false);
    });
  });

  test("renders loggedInHome when user is logged in", () => {
    const search = jest.fn();
    const setLoading = jest.fn();
    const loading = false;
    const currUser = { username: "testuser" };
    const favStationInfo = { result: [{ id: 1, name: "test station" }] };

    const { getByText } = render(
      <MemoryRouter>
        <UserContext.Provider value={{ currUser, favStationInfo, loading, setLoading }}>
          <Homepage search={search} />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(getByText(/Favorites/i)).toBeInTheDocument();
    expect(getByText(/test station/i)).toBeInTheDocument();
  });
});