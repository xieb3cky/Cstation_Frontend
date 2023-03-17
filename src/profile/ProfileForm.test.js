import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
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


describe('ProfileForm', () => {
  it('should render the form', () => {
    const { getByLabelText, getByText } = render(<ProfileForm />);
    expect(getByLabelText('First Name')).toBeInTheDocument();
    expect(getByLabelText('Last Name')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Profile Image')).toBeInTheDocument();
    expect(getByLabelText('Re-enter password to make changes:')).toBeInTheDocument();
    expect(getByText('Update')).toBeInTheDocument();
  });

  it('should update the form data and submit when the update button is clicked', async () => {
    const { getByLabelText, getByText } = render(<ProfileForm />);
    const firstNameInput = getByLabelText('First Name');
    const lastNameInput = getByLabelText('Last Name');
    const emailInput = getByLabelText('Email');
    const profileImgInput = getByLabelText('Profile Image');
    const passwordInput = getByLabelText('Re-enter password to make changes:');
    const updateButton = getByText('Update');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(profileImgInput, { target: { value: 'http://example.com/profile.jpg' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(firstNameInput).toHaveValue('John');
      expect(lastNameInput).toHaveValue('Doe');
      expect(emailInput).toHaveValue('john.doe@example.com');
      expect(profileImgInput).toHaveValue('http://example.com/profile.jpg');
      expect(passwordInput).toHaveValue('');
    });
  });
});