import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm({ signup }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        bio: "",
        profile_img: "",
        cover_img: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    console.debug(
        "SignupForm",
        "signup=", typeof signup,
        "formData=", formData,
        "formErrors=", formErrors,
    );

    /** Handle form submit:
     *
     * Calls login func prop and, if successful, redirect to /companies.
     */

    async function handleSubmit(evt) {
        evt.preventDefault();
        console.log("signing up")
        let result = await signup(formData);
        if (result.success) {
            navigate("/");
        } else {
            setFormErrors(result.errors);
        }
        setFormData({
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            bio: "",
            profile_img: "",
            cover_img: ""
        })
    }

    /** Update form data field */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <div className="flex center body-container">
            <div className="page-grid grid">
                <section className="banner grid center">
                </section>

                <section className="form-wrapper grid center">
                    <form className="form-section" onSubmit={handleSubmit}>
                        <div className="header">
                            <h1>Hello there! <span>👋</span></h1>
                            <p>Please enter your details.</p>
                        </div>
                        <div className="field">
                            <label>Username</label>
                            <input
                                name="username"
                                className="form-control"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                            />
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                        </div>

                        <div className="field">
                            <label>First Name</label>
                            <input
                                name="firstName"
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"

                            />
                        </div>
                        <div className="field">
                            <label>Last Name</label>
                            <input
                                name="lastName"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                            />
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>Sign in</button>
                    </form>
                </section>

                {formErrors?.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

            </div>
        </div>
    )
}

export default SignupForm;