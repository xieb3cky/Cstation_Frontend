import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SignupForm from "./SignupForm";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <SignupForm />
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});


describe('SignupForm', () => {
    it('should call signup function and redirect to home page on successful submission', async () => {

        const mockSignup = jest.fn(() => Promise.resolve({ success: true }));
        const { getByLabelText, getByText } = render(<SignupForm signup={mockSignup} />);

        fireEvent.change(getByLabelText('Username'), { target: { value: 'john' } });
        fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
        fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
        fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
        fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.submit(getByText('Sign in'));

        expect(mockSignup).toHaveBeenCalledWith({
            username: 'john',
            password: 'password123',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            bio: '',
            profile_img: '',
            cover_img: ''
        });
        await waitFor(() => expect(window.location.pathname).toBe('/'));
    });

    it('should display form errors on failed submission', async () => {
        const mockSignup = jest.fn(() => Promise.resolve({ success: false, errors: ['Invalid email'] }));
        const { getByLabelText, getByText, findByText } = render(<SignupForm signup={mockSignup} />);

        fireEvent.change(getByLabelText('Email'), { target: { value: 'invalid' } });
        fireEvent.submit(getByText('Sign in'));

        const errorElement = await findByText('Invalid email');
        expect(errorElement).toBeInTheDocument();
    });
});