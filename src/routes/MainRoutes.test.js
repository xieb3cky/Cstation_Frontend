import React from "react";
import { render } from "@testing-library/react";
import MainRoutes from "./MainRoutes";
import { MemoryRouter } from "react-router";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <MainRoutes />
      </UserProvider>
    </MemoryRouter>,
  );
});

describe('MainRoutes component', () => {
  const mockLogin = jest.fn();
  const mockSignup = jest.fn();
  const mockSearch = jest.fn();
  const mockStations = [];

  it('should render without crashing', () => {
    render(
      <MemoryRouter>
        <MainRoutes
          login={mockLogin}
          signup={mockSignup}
          search={mockSearch}
          stations={mockStations}
        />
      </MemoryRouter>
    );
  });
});