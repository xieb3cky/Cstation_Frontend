import React from 'react';
import { Routes, Route } from "react-router-dom";
import UserContext from "../auth/UserContext";
import Homepage from "../homepage/Homepage";
import StationList from "../stations/StationList";


import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../profile/ProfileForm";

// import PrivateRoute from "./PrivateRoute";

import SearchForm from "../search/SearchForm";
/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route Navigates to the homepage.
 */

function MainRoutes({ login, signup, search, stations }) {

  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`,
  );


  return (
    <>
      <Routes>
        <Route exact path="/" element={<Homepage search={search} stations={stations} />}>
        </Route>
        <Route exact path="/search" element={<SearchForm search={search} />}>
        </Route>
        <Route exact path="/login" element={<LoginForm login={login} />}>
        </Route>
        <Route exact path="/signup" element={<SignupForm signup={signup} />}>
        </Route>
        <Route exact path="/stations" element={<StationList stations={stations} search={search} />}>
        </Route>
        <Route exact path="/profile" element={<ProfileForm />}>
        </Route>
      </Routes>
    </>
  );
}

export default MainRoutes;
