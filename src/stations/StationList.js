import React from "react";

import StationCard from "./StationCard";
import Map from "../search/Map";
// import LoadingSpinner from "../common/LoadingSpinner";

import "./StationList.css";

/** Show page with list of charging stations
 *
 * This is routed to at /stations
 *
 * Routes -> { StationList, SearchForm }
 */

function StationList({ stations }) {
    console.debug("StationList");


    // if (!stations) return <LoadingSpinner />;

    return (
        <>
            <div className="fullmap">
                <Map stations={stations} />
            </div>
            <div className="citems">
                {stations ?
                    (<div className="">
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
                    </div>) : (<></>)
                }
            </div>

        </>


        // <div className="flex center body-container">
        //     <Map stations={stations} />
        //     <div className="display-page">
        //         <section className="form-wrapper grid center">
        //             {stations ?
        //                 (<div className="center scroll list">
        //                     {stations.map(s => (
        //                         <StationCard
        //                             key={s["AddressInfo"]["ID"]}
        //                             id={s["AddressInfo"]["ID"]}
        //                             name={s["AddressInfo"]["Title"]}
        //                             address={s["AddressInfo"]["AddressLine1"]}
        //                             state={s["AddressInfo"]["StateOrProvince"]}
        //                             postcode={s["AddressInfo"]["Postcode"]}
        //                             phone={s["AddressInfo"]["ContactTelephone1"]}
        //                             email={s["AddressInfo"]["ContactEmail"]}
        //                             available={s["Connections"][0]["Quantity"]}
        //                             charger_type={s["Connections"][0]["Quantity"]}
        //                         />
        //                     ))}
        //                 </div>) : (<></>)
        //             }
        //         </section>
        //     </div >
        // </div >
    );
}

export default StationList;






