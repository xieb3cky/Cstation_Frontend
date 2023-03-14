import React from "react";
import { render } from "@testing-library/react";
import MainRoutes from "./MainRoutes";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <MainRoutes />
      </UserProvider>
    </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <MainRoutes />
      </UserProvider>
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
