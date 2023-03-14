import React from "react";
import { render } from "@testing-library/react";
import ProfileForm from "./ProfileForm";
import { UserProvider } from "../testUtils";

it("matches snapshot", function () {
  const { asFragment } = render(
    <UserProvider>
      <ProfileForm />
    </UserProvider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
