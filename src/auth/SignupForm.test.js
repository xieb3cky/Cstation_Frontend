import React from "react";
import { render } from "@testing-library/react";
import SignupForm from "./LoginForm";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <SignupForm />
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
