import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from "../auth/UserContext";
import "./NavBar.css"

function NavBar({ signout, signup }) {
    const { currUser } = useContext(UserContext);

    function loggedInNav() {
        return (
            <ul className="links">
                <li><a href="/search">Search</a></li>
                <li><a href="/search">Quick Search</a></li>
                <li><a href="/profile">Profile</a></li>
                <li>
                    <Link to="/" onClick={signout}>
                        Log Out
                    </Link>
                </li>
            </ul>
        )
    };


    function loggedOutNav() {
        return (
            <ul className="links">
                <li><a href="/search">Search</a></li>
                <li><a href="/search">Quick Search</a></li>
                <li><a href="/login">Log In</a></li>
                <li><a href="/signup">Sign Up</a></li>
            </ul>
        )
    };

    return (
        <>
            <div class="header-area">
                <div class="logo"><b> <a href="/">C - Station</a></b></div>
                {currUser ? loggedInNav() : loggedOutNav()}

            </div>

        </>
    );
};



export default NavBar;
