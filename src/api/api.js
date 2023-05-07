import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/**
 * API Class
 * 
 * Static class tying together methods used to get/send to to the backend.
 *
 */
class CstationAPI {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;

        const params = (method === "get")
            ? data
            : {};

        const headers = {
            "Content-Type": "application/json"
        };

        try {
            const result = await axios(url, { method: method, data: data, params: params, headers: headers });
            return result;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }

    }


    // Individual API routes

    /** Get token for login from username, password. */

    static async login(data) {
        console.log("sending log in request")
        let res = await this.request(`auth/login`, data, "post");
        return res.data.token;
    }

    /** Signup for site. */

    static async signup(data) {
        console.log("sending register request")
        let res = await this.request(`auth/register`, data, "post");
        return res.data.token;
    }

    /** Save user profile page. */

    static async saveProfile(username, data) {
        let res = await this.request(`user/${username}`, data, "patch");
        return res.data.user;
    }

    /** Get current user data */
    static async getCurrentUser(username) {
        let res = await this.request(`user/${username}`);
        return res.data.user;
    }

    /** Stations  */

    static async getStations(data) {
        const res = await this.request(`station/newSearch`, data, "post");
        return res.data.stations;
    }

    static async getStation(id) {
        const res = await this.request(`station/${id}`);
        return res.data.station;

    }
    /** Favorites */
    static async favorite(data) {
        const res = await this.request(`user/favorites`, data, "post");
    }
    /**Get all of user's favorites */
    static async getAllFavorites(user_id) {
        const res = await this.request(`auth/favorites/${user_id}`);

        return res.data;
    }
    /**Remove user's favorites */
    static async deleteFavorite(data) {
        const res = await this.request(`user/delete-favorite`, data, "post");
    }

}

export default CstationAPI;