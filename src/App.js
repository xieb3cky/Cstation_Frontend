
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import NavBar from "./routes/NavBar";
import MainRoutes from "./routes/MainRoutes";
import CstationAPI from "./api/api";
import UserContext from "./auth/UserContext";
import Loading from "./common/Loading";

import jwt from "jsonwebtoken";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "cstation-token";

/** C-Station application.
 *
 * - infoLoaded: manage if user info is loaded 
 * 
 * - favorites: represents user's list of favorite charging stations IDs.
 * 
 * - favStationInfo: represents favorite charging station information.
 *
 * - currUser: user obj from API. If someone is logged in. 
 *  This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 * 
 * -searchStation : list of search results from searches.
 * 
 * -loading: represent whether or not if the app is loading data, manages Loading battery animation.
 *
 * App -> Routes
 */


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [favorites, setfavorites] = useState(new Set());
  const [favStationInfo, setFavStations] = useState(null);
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [searchStations, setSearchStations] = useState();
  const [loading, setLoading] = useState(false);


  console.debug(
    "App",
    "favorites", favorites,
    "favStationInfo", favStationInfo,
    "searchStations", searchStations,
    "loading", loading,
    "currUser=", currUser,
    "token=", token,
  );



  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);

          // put the token on the Api class so it can use it to call the API.
          CstationAPI.token = token;
          let currentUser = await CstationAPI.getCurrentUser(username);
          setCurrUser(currentUser);
          let user_faves = currentUser.favorites.map((e) => e.id);
          let ff = new Set(user_faves);
          setfavorites(ff);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  //Get charging station info for each of user's favorites
  useEffect(() => {
    async function getFavStations() {
      if (currUser) {
        const res = await CstationAPI.getAllFavorites(currUser.id);
        setFavStations(res);

      }
    }
    getFavStations()
  }, [currUser])


  /** Handles site-wide signup.
 *
 * Logs user in and (set token) upon signup.
 *
 */
  async function signup(signupData) {
    try {
      let token = await CstationAPI.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }
  /** Handles site-wide login.
   * 
   * Logs user in and (set token) upon verified credentials. 
   */
  async function login(loginData) {
    try {
      let token = await CstationAPI.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide logout.
   * 
   *  Sets currUser & token to null. 
   */
  function signout() {
    setCurrUser(null);
    setToken(null);
  }

  /**
   * Pass form data to backend.
   * 
   * Set SearchStations state with stations list returned from Open Charger Map API.
   */
  async function search(data) {
    try {
      let stations = await CstationAPI.getStations(data);
      setSearchStations(stations);
      return { success: true };
    }
    catch (errors) {
      console.error("search failed", errors)
      return { success: false, errors };
    }

  };

  /**
   * Checks if station has been favorited - if station id is in user's favorites list.
   */
  function favorited(id) {
    return favorites.has(id);
  }

  /**
   * Function to favorite a charging station. 
   * 
   * Pass station id in favorited func - checks if station has been favorited.
   * If not, setFavorites state to include the new station id to favorites.
   * 
   * Then, pass station info to backend to save station info and user's list of favorites. 
  */
  async function favoriteStation(data) {
    if (favorited(data.id)) return;
    setfavorites(new Set([...favorites, data.id]));
    //add user id to data --> sent to backend
    data["user_id"] = currUser.id;
    let res = await CstationAPI.favorite(data);
    return { success: true };
  }
  /**
   * Function to delete/un-favorite a station.
   * 
   * Filter favorites array to remove deleted favorite. 
   * 
   * Then pass data: user_id & station_id to backend to remove from user's list of favorites.
  */

  async function deleteFavorite(id) {
    //covert set to a array to filter out the station ID that is un-favorited
    let favorites_ = [...favorites]

    favorites_ = favorites_.filter((f) => f !== id)

    //sent data {user ID & station ID} to backend to remove from our DB
    const data = {
      user_id: currUser.id,
      station_id: id
    }
    let res = await CstationAPI.deleteFavorite(data);
    setfavorites(new Set([...favorites_]))
  }


  return (

    < BrowserRouter >
      <UserContext.Provider value={{ loading, setLoading, currUser, setCurrUser, favorites, favorited, favoriteStation, deleteFavorite, favStationInfo }}>
        <NavBar signout={signout} signup={signup} search={search} stations={searchStations} />
        {loading ? (<Loading />) : (<MainRoutes login={login} signup={signup} search={search} stations={searchStations} />)}

      </UserContext.Provider>
    </BrowserRouter >
  );
}

export default App;
