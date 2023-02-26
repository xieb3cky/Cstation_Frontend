import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { style } from "./mapStyles"
import "./Map.css"

const libraries = ["places"];

/**
 * Component renders Google Map with markers for each charging station locations.
 * 
 */

function Map({ stations }) {

    /** useLoadScript hook from the @react-google-maps/api library to load 
     * the Google Maps JavaScript API with the places library.  */
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
        libraries,
    });

    let markers = [];

    if (stations) {
        let lat;
        let lng;
        stations.forEach((s) => {
            if ("lat" in s) {
                lat = Number(s.lat);
                lng = Number(s.long);
            } else {
                lat = Number(s["AddressInfo"]["Latitude"]);
                lng = Number(s["AddressInfo"]["Longitude"]);
            }
            markers.push({ lat, lng })
        })

    }
    return <Home markers={markers} />;
}

/**
 * Home component accepts prop : array of markers &
 *  renders the Google Map with the markers using the GoogleMap and MarkerF components from @react-google-maps/api.
 * 
 */
function Home({ markers }) {

    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

    const mapOptions = {
        disableDefaultUI: true,
        styles: style
    };


    return (
        <div>
            {
                markers.length > 0 &&
                (<GoogleMap zoom={12} center={markers[0]} mapContainerClassName="map-container" options={mapOptions}>
                    <div>
                        {
                            markers.map(m => (
                                <MarkerF
                                    position={m}
                                />
                            ))
                        }
                    </div>
                </GoogleMap>)
            }
        </div>
    )
}


export default Map;

