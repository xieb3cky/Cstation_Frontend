import React from "react";
import StationCard from "./StationCard";
import Map from "../search/Map";
import "./StationList.css";

/** Render a list of charging stations as well as the map of the area with the location of the charging stations.
 *
 * Takes in a single parameter 'stations', a array of station objects. 
 * 
 * Routed at '/stations'
 *
 * App --> MainRoutes -> StationList --> Map & StationCard
 * 
 */
function StationList({ stations }) {

    console.debug("StationList");

    return (
        <div>
            {stations &&
                <>
                    < div className="fullmap" >
                        < Map stations={stations} />
                    </div >
                    <div className="citems">
                        <div className="">
                            {stations.map(s => (
                                <StationCard
                                    key={s["AddressInfo"]["ID"]}
                                    id={s["AddressInfo"]["ID"]}
                                    name={s["AddressInfo"]["Title"]}
                                    address={s["AddressInfo"]["AddressLine1"]}
                                    state={s["AddressInfo"]["StateOrProvince"]}
                                    postcode={s["AddressInfo"]["Postcode"]}
                                    phone={s["AddressInfo"]["ContactTelephone1"]}
                                    email={s["AddressInfo"]["ContactEmail"]}
                                    available={s["Connections"][0]["Quantity"]}
                                    charger_type={s["Connections"][0]["Quantity"]}
                                    lat={s["AddressInfo"]["Latitude"]}
                                    long={s["AddressInfo"]["Longitude"]}
                                />
                            ))}
                        </div>
                    </div>
                </>
            }
        </div>

    )
}

export default StationList;










