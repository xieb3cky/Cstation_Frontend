import { useState } from "react";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

/**
 * Provides a search input field that auto-completes address using Google Place API.
 * 
 * @reach/combobox libraries, which provide the auto-complete functionality &
 *  UI components for the search field.
 * 
 */

const AutoComplete = ({ setAddress }) => {

    /** The usePlacesAutocomplete manage the auto-complete suggestions and value of the search field. */
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete();


    const handleInput = (e) => {
        setValue(e.target.value);
    };

    /**
     * Handle function as user types in the input box & selects a address (ex: JFK Airport)
     * The getGeocode and getLatLng functions from use-places-autocomplete are used to get 
     * the latitude and longitude of the address --> passed it to the setAddress function. 
     */
    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
        setAddress({ lat, lng });
    };

    /**
     * The component renders a Combobox component from @reach/combobox,
     *  wraps a ComboboxInput field & ComboboxPopover containing a ComboboxList of auto-complete suggestions. 
     *  The onSelect prop of the Combobox component is set to the handleSelect function to handle the selection of an address.
     */

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput value={value} onChange={handleInput} disabled={!ready} placeholder="Search your location" className="form-control input-form" />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
};

export default AutoComplete;