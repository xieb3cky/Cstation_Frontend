import React from "react";
import { render } from "@testing-library/react";
import StationList from "./StationList";

it("renders without crashing", function () {
    render(<StationList />);
});

it("matches snapshot with no stations", function () {
    const { asFragment } = render(<StationList />);
    expect(asFragment()).toMatchSnapshot();
});
