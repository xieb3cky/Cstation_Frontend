import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AutoComplete from "./AutoComplete";
import styled from 'styled-components';
import "./SearchForm.css"
import Loading from "../common/Loading";


const Slider = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  width:100%;
  height: 12px;
  border-radius: 40px;
  background: ${(props) =>
        `linear-gradient(to right, #8d62f7 0%, #b9a4ec  ${100 * (props.value - 1) / 9}%, #b9a4ec  ${100 * (props.value - 1) / 9}%, #fff 100%);`};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    background-image: radial-gradient(circle, #f7f7fc 40%, #7c73e6 45%);
    border-radius: 50%;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
  }
  ::-moz-range-thumb {
    width: 24px;
    height: 24px;
    -moz-appearance: none;
    background-image: radial-gradient(circle, #f7f7fc 40%, #ff9800 45%);
    border-radius: 50%;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
  }
`;


function SearchForm({ search }) {
    const [formData, setFormData] = useState({
        lat: "",
        lng: "",
        charger_type: "",
        maxResult: 1
    });
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    /**Update address state when AutoComplete componennt returns an address [lat, long]  */
    useEffect(() => {
        let { lat, lng } = address;
        setFormData(data => ({ ...data, ["lat"]: lat, ["lng"]: lng }));
    }, [address]);

    const [formErrors, setFormErrors] = useState([]);
    /** Handle form submit:
     *
     * Calls search function, redirects to /stations -- displays list of charging stations
     */
    async function handleSubmit(evt) {
        evt.preventDefault();
        setLoading(true);
        if (address) {
            let result = await search(formData);
            if (result.success) {
                setTimeout(() => {
                    setLoading(false);
                    navigate("/stations");
                }, 4000)
            } else {
                setFormErrors(result.errors);
            }
        }
        /**Reset form data to empty*/
        setFormData({
            lat: "",
            lng: "",
            charger_type: "",
            maxResult: "1"
        });
        /**Reset address to empty */
        setAddress("");
    }

    /** Update form data field: [charger type, max result] */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    return (
        <>
            {loading ? (<Loading />) : (<div className="flex center body-container">
                <div className="page-grid grid">
                    <section className="banner grid center">
                        <div class="road">
                            <div class="taxi">
                                <div class="light_beam"></div>
                                <div class="side_mirror"></div>
                                <span>
                                    <b></b>
                                    <i></i>
                                </span>
                            </div>
                        </div>
                    </section>
                    <section className="form-wrapper grid center">
                        <form className="form-section" onSubmit={handleSubmit}>
                            <div className="header">
                                <h1>👀  Find EV Chargers Near You  🔌</h1>
                            </div>
                            <div className="field">
                                <label className="field-title">Address</label>
                                <AutoComplete setAddress={setAddress} />
                            </div>
                            <div className="select field">
                                <label className="field-title">Ports</label>
                                <div className="radio-buttons">
                                    <div className="select-btn"> <label className="custom-radio">
                                        <input type="radio" name="charger_type" value={27} onChange={handleChange} />
                                        <span className="radio-btn tesla"
                                        ><i className="las la-check"></i>
                                            <div class="hobbies-icon">
                                                <h3>Tesla</h3>
                                            </div>
                                        </span>
                                    </label></div>
                                    <div className="select-btn">  <label className="custom-radio">
                                        <input type="radio" name="charger_type" value={1} onChange={handleChange} />
                                        <span className="radio-btn jplug"
                                        ><i className="las la-check"></i>
                                            <div className="hobbies-icon">
                                                <h3>J-Plug</h3>
                                            </div>
                                        </span>
                                    </label></div>
                                    <div className="select-btn" >  <label class="custom-radio">
                                        <input type="radio" name="charger_type" value={32} onChange={handleChange} />
                                        <span class="radio-btn ccs"
                                        ><i class="las la-check"></i>
                                            <div class="hobbies-icon">
                                                <h3>CCS-1</h3>
                                            </div>
                                        </span>
                                    </label></div>
                                    <div className="select-btn" > <label class="custom-radio">
                                        <input type="radio" name="charger_type" value={2} onChange={handleChange} />
                                        <span class="radio-btn chad"
                                        ><i class="las la-check"></i>
                                            <div class="hobbies-icon">
                                                <h3>Chademo</h3>
                                            </div>
                                        </span>
                                    </label></div>


                                </div>
                            </div>
                            <div>
                                <label className="field-title">Max Result</label>
                                <h2 className="mm">{formData.maxResult}</h2>
                                <div className="range">
                                    <Slider name="maxResult" min="1" max="10" value={formData.maxResult} onChange={handleChange} required />
                                </div>
                            </div>
                            <button className="search-button">Search</button>
                        </form>
                    </section>
                </div>
            </div >)
            }
        </>
    );
}

export default SearchForm;

