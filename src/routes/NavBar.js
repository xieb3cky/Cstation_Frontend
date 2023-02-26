import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from "../auth/UserContext";

import "./NavBar.css"

function NavBar({ signout, signup, search }) {
    const { currUser, setLoading } = useContext(UserContext);
    const navigate = useNavigate();


    async function handleQuickSearch(evt) {
        evt.preventDefault();
        setLoading(true);

        let lat;
        let lng;

        navigator.geolocation.getCurrentPosition(async (position) => {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            const data = {
                lat: lat,
                lng: lng
            }
            let result = await search(data);
            if (result.success) {
                setTimeout(() => {
                    setLoading(false);
                    navigate("/stations");
                }, 4000)
            }
        })
    }


    function loggedInNav() {
        return (
            <ul className="links">
                <li><a href="/search">Search</a></li>
                <li><a href="" onClick={handleQuickSearch}>Quick Search</a></li>
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
                <li><a href="" onClick={handleQuickSearch}>Quick Search</a></li>
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
