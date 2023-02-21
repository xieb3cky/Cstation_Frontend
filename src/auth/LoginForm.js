import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Alert from "../common/Alert";


/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    console.debug(
        "LoginForm",
        "login=", typeof login,
        "formData=", formData,
        "formErrors", formErrors,
    );

    /** Handle form submit:
     *
     * Calls login func prop and, if successful, redirect to /companies.
     */

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);

        if (result.success) {
            navigate("/");
        } else {
            setFormErrors(result.errors);
        }
        setFormData({
            username: "",
            password: ""
        })
    }

    /** Update form data field */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(l => ({ ...l, [name]: value }));
    }

    return (
        <div className="flex center body-container">
            <div className="page-grid grid">
                <section className="banner grid center">
                </section>

                <section className="form-wrapper grid center">
                    <form className="form-section" onSubmit={handleSubmit}>
                        <div className="header">
                            <h1>Welcome Back ! 😄</h1>
                            <p>Please enter your details.</p>
                        </div>
                        <div className="field">
                            <label>Username</label>
                            <input
                                name="username"
                                className="form-control"
                                value={formData.username}
                                onChange={handleChange}

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

                            />
                        </div>

                        <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>Sign in</button>
                    </form>
                </section>


            </div>
        </div>
    );
}

export default LoginForm;

