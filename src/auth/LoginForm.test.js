import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});

it('calls login function prop and redirects on successful submission', async () => {
  const loginMock = jest.fn(() => Promise.resolve({ success: true }));
  const { getByLabelText, getByText } = render(
    <MemoryRouter>
      <LoginForm login={loginMock} />
    </MemoryRouter>
  );

  const usernameInput = getByLabelText('Username');
  const passwordInput = getByLabelText('Password');
  const submitButton = getByText('Sign in');

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(loginMock).toHaveBeenCalledWith({ username: 'testuser', password: 'testpassword' });
    expect(window.location.pathname).toBe('/');
  });
});