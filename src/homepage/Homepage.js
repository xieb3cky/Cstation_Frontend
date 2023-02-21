import React, { useContext, useState, useEffect } from "react";
// import { Link, NavLink } from "react-router-dom";
import "./Homepage.css";
import Map from "../search/Map";
import UserContext from "../auth/UserContext";
import video from "./ev-video2.mp4";
import CstationAPI from "../api/api";
import StationCard from "../stations/StationCard";
import "../search/Map.css"

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage({ search }) {
    const { currUser, favStationInfo } = useContext(UserContext);

    // const [favStationInfo, setFavStations] = useState([]);

    console.debug("Homepage", "currentUser=", currUser);
    // Get charging station info for each of user's favorites
    // useEffect(() => {
    //     async function getFavStations() {
    //         if (currUser) {
    //             const res = await CstationAPI.getAllFavorites(currUser.id)
    //             setFavStations(res)
    //         }
    //     }
    //     getFavStations()
    // }, [currUser])
    // console.log(favStationInfo.result)
    // favStationInfo.result.map((s) => {
    //     console.log(s["id"])
    //     console.log(s["name"])
    // })


    // useEffect(() => {

    //     getFavStationInfo();
    //     console.log(favStationInfo)


    // }, [])



    // console.log(favorites)
    const loggedInHome = () => {
        return <div>
            {/* <div className="fullmap">
                <Map />
            </div> */}

            <div className="citems">

                {favStationInfo.result &&
                    <div className="">
                        {favStationInfo.result.map(s => (
                            <StationCard
                                key={s.id}
                                id={s.id}
                                name={s.name}
                                address={s.address}
                                phone={s.phone}
                                email={s.email}
                                available={s.available}
                                charger_type={s.charger_type}
                                lat={s.lat}
                                long={s.long}
                            />
                        ))}
                    </div>
                }
            </div>

        </div>
    }



    const loggedOutHome = () => {
        return <div>
            <video id="background-video" autoPlay loop muted>
                <source src={video} type="video/mp4" />
            </video>
            <div class="landing-page">
                <div class="landing-container">

                    <div class="info">
                        <h1>Search Electric Chargers Near You</h1>
                        <p>1. Enter your address</p>
                        <p>2. Select charger type</p>
                        <p>3. Select max result</p>
                        <p>4. Hit Search</p>
                        <div className="or-option"> OR </div>
                        <button>Quick Search</button>
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        <>
            {currUser && favStationInfo ? loggedInHome() : loggedOutHome()}
        </>
    );
}

export default Homepage;

