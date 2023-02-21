import React, { useContext, useEffect, useState } from "react";
import * as AiIcons from 'react-icons/ai';
import UserContext from "../auth/UserContext";
import "./StationCard.css";



function StationCard({ id, name, address, state, postcode, phone, email, available, charger_type, lat, long }) {
    const { favorited, favoriteStation, deleteFavorite } = useContext(UserContext);
    const [favorite, setFavorite] = useState(false);

    let address_complete;
    if (state && postcode) {
        address_complete = `${address} ${state} ${postcode}`;
    } else {
        address_complete = address
    }


    console.log(id)



    useEffect(() => {
        if (favorited(id)) {
            setFavorite(true);
        }
    }, [])


    async function handleFavorite(evt) {
        //check if already favorited
        console.log(id)
        if (favorited(id)) {
            deleteFavorite(id)
            console.log("already favorited, can't favorite again!")
            setFavorite(!favorite);
        } else {
            //if not favorite, favorite the station
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
            //change style base on favorited status
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
                    target="_blank">📍 {address_complete}</a>


            </div>
        </div>
    );

}

export default StationCard;

