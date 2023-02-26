import React, { useState, useContext, useEffect } from "react";
import Alert from "../common/Alert";
import CstationAPI from "../api/api";
import UserContext from "../auth/UserContext";
import './ProfileForm.css'

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally a simple <Alert>, but
 * you can opt-in to our fancy limited-time-display message hook,
 * `useTimedMessage`, but switching the lines below.
 *
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */

function ProfileForm() {
    const { currUser, setCurrUser } = useContext(UserContext);
    const [formData, setFormData] = useState(null);
    const [formErrors, setFormErrors] = useState([]);

    //pre-fill form data inputs to user's current information
    useEffect(() => {

        if (currUser) {
            let data = {
                firstName: currUser.first_name,
                lastName: currUser.last_name,
                email: currUser.email,
                username: currUser.username,
                password: "",
                profile_img: currUser.profile_img || ""
            }
            setFormData(data)
        }
    }, [currUser])


    console.debug(
        "ProfileForm",
        "currUser=", currUser,
        "formData=", formData,
        "formErrors=", formErrors
    );

    /** on form submit:
     * - attempt save to backend & report any errors
     * - if successful
     *   - clear previous error messages and password
     *   - show save-confirmed message
     *   - set current user info throughout the site
     */

    async function handleSubmit(evt) {
        evt.preventDefault();

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            profile_img: formData.profile_img,
        };

        let username = formData.username;
        let updatedUser;

        try {
            updatedUser = await CstationAPI.saveProfile(currUser.username, profileData);
        } catch (errors) {
            debugger;
            setFormErrors(errors);
            return;
        }

        setFormData(f => ({ ...f, password: "" }));
        setFormErrors([]);

        // trigger reloading of user information throughout the site
        setCurrUser(updatedUser);
    }

    /** Handle form data changing */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({
            ...f,
            [name]: value,
        }));
        setFormErrors([]);
    }

    return (

        <div className="flex center body-container">
            {formData && <>
                <div className="page-grid grid">
                    <section className="banner grid center">
                        <div id="card">
                            <h1>{formData.username} </h1>
                            <div id="avatar"></div>
                            <div id="profile">
                            </div>
                        </div>
                    </section>
                    <section className="form-wrapper grid center">
                        <form className="form-section" onSubmit={handleSubmit}>
                            <div className="header-title">
                                <h1>Update Information<span>✏️</span></h1>
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
                            <div className="field">
                                <label>Profile Image</label>
                                <input
                                    name="profile_img"
                                    className="form-control"
                                    value={formData.profile_img}
                                    onChange={handleChange}
                                    placeholder="Profile Image URL"
                                />
                            </div>

                            <div className="field">
                                <label>Re-enter password to make changes:</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>Update</button>
                        </form>
                    </section>
                    {formErrors?.length
                        ? <Alert type="danger" messages={formErrors} />
                        : null
                    }
                </div>
            </>}
        </div>
    );
}

export default ProfileForm;


