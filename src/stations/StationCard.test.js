import React from "react";
import { render } from "@testing-library/react";
import StationCard from "./StationCard";
import { UserProvider } from "../testUtils";


it("matches snapshot", function () {
  let station = {
    id: 123,
    name: "JFK Supercharger",
    address: "123 Address JFK Queens NY, NY",
    lat: "40.641312",
    long: "-73.778137",
    charger_type: "27",
    phone: "123-456-789",
    email: "JFKcharger@email.com",
    available: 10
  }
  const { asFragment } = render(
    <UserProvider>
      <StationCard station={station} />
    </UserProvider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
