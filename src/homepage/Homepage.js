import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from "../search/Map";
import UserContext from "../auth/UserContext";
import StationCard from "../stations/StationCard";
import video from "./ev-video2.mp4";
import "./Homepage.css";
import Loading from "../common/Loading";

/** Homepage of the site.
 *
 * Takes in a single parameter 'search' function. 
 * 
 * User context : currUser & favStationInfo (list of user's favorited stations information)
 * 
 * If verified user is logged in ==> renders loggedInHome() , else  ==> loggedOutHome(). 
 * 
 * Routed at '/'
 *
 * App --> MainRoutes -> Homepage --> Map & StationCard
 * 
 */

function Homepage({ search }) {
    const { currUser, favStationInfo, loading, setLoading } = useContext(UserContext);

    const navigate = useNavigate();

    console.debug("Homepage", "currentUser=", currUser);



    async function handleQuickSearch() {
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

    /**
     * Function that displays map and user's list of favorited charging stations. 
     * 
     * @returns:
     * - Map with makers of favorited station's lat & long.
     * - StationCard component, displaying station's relevant information {id, name, address, phone, email, available, charger type}
     * 
     */

    const loggedInHome = () => {
        return <div>

            {favStationInfo.result &&
                <>
                    <div className="fullmap">
                        <Map stations={favStationInfo.result} />
                    </div>

                    <div className="citems">
                        <div>
                            <h1 className="citems-favorites-home">Favorites</h1>
                            {favStationInfo.result.map(s => (
                                <StationCard
                                    key={s.id}
                                    id={s.station_id}
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

                    </div>
                </>
            }
        </div >
    }

    /**
       * Function that displays instruction for search or option to conduct a quick search.
       * 
       * @returns:
       * - Instructions on how to search for electric chargers.
       * - Video background.
       * - Quick search option.
       * 
       */

    const loggedOutHome = () => {
        return <div>
            {loading ? (<Loading />) : (
                <>
                    <video id="background-video" autoPlay loop muted>
                        <source src={video} type="video/mp4" />
                    </video>
                    <div class="landing-page">
                        <div class="landing-container">
                            <div class="info">
                                <h1>Search Electric Car Chargers Near You</h1>
                                <p>1. Enter your address</p>
                                <p>2. Select charger type</p>
                                <p>3. Select max result</p>
                                <p>4. Hit Search</p>
                                <div className="or-option"> OR </div>
                                <button onClick={handleQuickSearch}>Quick Search</button>
                            </div>
                        </div>
                    </div>
                </>)
            }

        </div >
    }

    /**
     * Logic to check if there's currUser logged in && favStationsInfo render loggedInHome function, 
     * else ==> loggedOutHome function.
     */
    return (
        <>
            {currUser && favStationInfo ? loggedInHome() : loggedOutHome()}
        </>
    );
}

export default Homepage;

