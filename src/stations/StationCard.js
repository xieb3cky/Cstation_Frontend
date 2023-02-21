import React, { useContext, useEffect, useState } from "react";
import * as AiIcons from 'react-icons/ai';
import UserContext from "../auth/UserContext";
import "./StationCard.css";

/** 
 *  The StationCard component takes the following props: 
 * 
 *   {id, name, address, state, postcode, phone, email, available, charger_type, lat, and long} 
 *  
 *  These props are used to display information about each charging station in the list.
 * 
 *  UserContext : favorited, favoriteStation, deleteFavorite functions.
 *  
 *  favorited --> check if the charging station is already favorited.
 *  favoriteStation --> add favorited station to user's favorites in our database. 
 *  deleteFavorite -->  remove station from user's favorites. 
 * 
 *  Routed at '/stations'
 * 
 * App --> MainRoutes -> StationList --> StationCard
 */


function StationCard({ id, name, address, state, postcode, phone, email, available, charger_type, lat, long }) {

    const { favorited, favoriteStation, deleteFavorite } = useContext(UserContext);
    const [favorite, setFavorite] = useState(false);

    // concact address + sate + postcode to a complete address
    let address_complete;
    if (state && postcode) {
        address_complete = `${address} ${state} ${postcode}`;
    } else {
        address_complete = address;
    };

    useEffect(() => {
        if (favorited(id)) {
            setFavorite(true);
        }
    }, [])

    /**
     *  handleFavorite function is called when the "Favorite" button is clicked. 
     * 
     *  Checks if station has been already favorited with favorited() function, passing in station ID.
     *  
     *  If station is already part of favorites --> delete from favorte list with deleteFavorite() function, 
     *   passing in station ID and set favorite state of false. 
     * 
     *  Else if not already favorited --> favorite the station: saves station to our database & add station to user's favorites list.
     * 
     */
    async function handleFavorite(evt) {
        if (favorited(id)) {
            deleteFavorite(id)
            setFavorite(!favorite);
        } else {
            const data = {
                id: id,
                name: name,
                address: address_complete,
                charger_type: charger_type,
                lat: lat,
                long: long,
                available: available,
                phone: phone,
                email: email
            }
            favoriteStation(data);
            setFavorite(!favorite);
        }
    }
    return (
        <div class="card">
            <div class="additional">
                <div class="more-info">
                    <div class="user-card">
                        <div class="level center">
                            Available
                        </div>
                        <div className="avail">
                            {available ? (<h1>{available}</h1>) : (<h1>n/a</h1>)}
                        </div>
                        <div class="points center">
                            More Info
                        </div>
                    </div>
                    <div class="coords">
                        <span>Email : </span>
                        {email ? (<span>{email}</span>) : (<span> N/A</span>)}
                    </div>
                    <div class="coords">
                        <span>Phone Number : </span>
                        {phone ? (<span>{phone}</span>) : (<span> N/A</span>)}
                    </div>
                    <div class="coords">
                        <span>Port : </span>
                        {charger_type ? (<span>{charger_type}</span>) : (<span> N/A</span>)}
                    </div>
                    <button className={favorite ? "fav  yes" : "fav"} onClick={handleFavorite}>  <AiIcons.AiFillHeart />Favorite</button>

                </div>
            </div>
            <div className="general">
                <h1>{name}</h1>
                <a className="address-link" href={`https://www.google.com/maps?daddr=${lat},${long}`}
                    target="_blank">{address_complete}</a>


            </div>
        </div>
    );

}

export default StationCard;

