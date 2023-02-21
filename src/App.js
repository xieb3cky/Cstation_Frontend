
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import NavBar from "./routes-nav/NavBar";
import MainRoutes from "./routes-nav/MainRoutes";
import CstationAPI from "./api/api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "cstation-token";


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [favorites, setfavorites] = useState(new Set());
  const [favStationInfo, setFavStations] = useState(null);
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [searchStations, setSearchStations] = useState();

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
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

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  //Get charging station info for each of user's favorites
  useEffect(() => {
    async function getFavStations() {
      if (currUser) {
        const res = await CstationAPI.getAllFavorites(currUser.id);
        console.log(res)
        setFavStations(res);

      }
    }
    getFavStations()
  }, [currUser])


  /** Handles site-wide signup.
 *
 * Automatically logs them in (set token) upon signup.
 *
 * Make sure you await this function and check its return value!
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
   * Make sure you await this function and check its return value!
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

  /** Handles site-wide logout. */
  function signout() {
    console.log("signed out")
    setCurrUser(null);
    setToken(null);
  }

  /**
   * Pass form data to backend then get request Open Charger API for chargers
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

  /**check is user already favorited a station */
  function favorited(id) {
    // const f = new Set(...favorites)
    // setfavorites(f)
    return favorites.has(id);
  }

  /**favorites a station*/
  async function favoriteStation(data) {

    if (favorited(data.id)) return;
    // console.log("favorting a station brb!")
    setfavorites(new Set([...favorites, data.id]));
    console.log(favorites)
    data["user_id"] = currUser.id;
    let res = await CstationAPI.favorite(data);
    return { success: true };
  }


  async function deleteFavorite(id) {
    let favorites_ = [...favorites]

    favorites_ = favorites_.filter((f) => f != id)
    console.log(id)
    console.log(favorites_)

    const data = {
      user_id: currUser.id,
      station_id: id
    }
    let res = await CstationAPI.deleteFavorite(data);
    setfavorites(new Set([...favorites_]))
    // setfavorites(new Set(favorites_));
  }


  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currUser, setCurrUser, favorites, favorited, favoriteStation, deleteFavorite, favStationInfo }}>
        <NavBar signout={signout} signup={signup} searchFor={search} />
        <MainRoutes login={login} signup={signup} search={search} stations={searchStations} />
      </UserContext.Provider>
    </BrowserRouter >
  );
}

export default App;
