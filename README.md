
# C Station

***** WORK IN PROGRESS ****

## Summary
Easy-to-use solution for users who are searching for electric car charging stations near their current location.

Using geolocation data, the application presents users with charging stations based on their search criteria. Users can refine their search further by specifying electric charger type and maximum results. 

The application also offers tools to help users favorite/un-favorite and leave reviews for a charging station. The detailed reviews of charging stations can help other users make informed decisions, and they can also view relevant information for selecting charging stations.

## Technologies
 - React
 - JavaScript
 - Node.js/Express


## APIs
 - [Open Charger Map API](https://openchargemap.org/site)
   - Utilizied to find electric car charging stations based on geo location. 
   - Search parameters : {latitude, longitude, charger type, max result} => sent to Open Charger Map API.
   - The API responds with list of charging stations based on criteria. 
 - [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
   - Utilized to create custom map with markers to display the location of each charging station on a Google Map.
   - Places library's autocomplete feature offers a convenient "type-ahead-search behavior" that enables users to quickly find matching full words and substrings. With the ability to resolve place names, addresses, and codes, it simplifies the search process for users.



## Acknowledgements

 - [Landing page background video](https://www.youtube.com/watch?v=M32bzsBswAk)
 - [Animated blue car](https://codepen.io/gvissing/pen/RwBMxKj)
  
## Features 
 - New user registration
 - Log in/log out for returing user
 - Save/favorite a charging station for future reference
 - Leave reviews for a charging station (***work in progress***)
 - Search for electric car chargers base on user's input geo location
  
## Demo

### Homepage 
Landing page consist of background video credit section located above. The navigation bar features various options, including search, quick search, log in, and sign up for easy access. Users can initiate a 'quick search' that takes user's current geolocation data to automatically search for charging stations nearby. Alternatively, users can perform a more detailed 'search' that requires additional information, such as the user's location, desired charger type, and maximum search results (limit to 10).
<p align="center">
  <img src="https://github.com/xieb3cky/Cstation_Frontend/blob/master/demo/landing-pagegif.gif" alt="animated" />
</p>

### Search Form 
The search form displays an autocomplete input box that offers location-based suggestions and predictions as the user types. Once the user has entered their location, they can select from a variety of charger types, including popular options like Tesla, CCS1, CHAdeMO, and J-Plug. After specifying their charger type preferences, the user can set a maximum results parameter and hit search button!
<p align="center">
  <img src="https://github.com/xieb3cky/Cstation_Frontend/blob/master/demo/search.gif" alt="animated" />
</p>

### Quick Search
Using the 'navigator.geolocation.getCurrentPosition()' method, we can automatically retrieve user's current geographic location (user must grant permission) and utilize the data to search for nearby charging stations. This eliminates the need for users to manually fill out a search form with location, maximum results, and charger type.
<p align="center">
  <img src="https://github.com/xieb3cky/Cstation_Frontend/blob/master/demo/search.gif" alt="animated" />
</p>


### Results
When a user submits a search form, the backend sends a GET request to the Open Charge Map API with the form data. The API returns a list of charging stations that match the user's search criteria. For each charging station in the list, React components are utilized to render a charging station card that displays relevant information about the station. Users can also easily favorite and un-favorite charging stations, which will save the charging station information to our databse.
<p align="center">
  <img src="https://github.com/xieb3cky/Cstation_Frontend/blob/master/demo/resgif.gif" alt="animated" />
</p> 

### Log In 
Log in form, welcomes returning user and requires username and password. 
1. Once user submits their login credentials & backend authenticates user's identiy --> user is redirected to homepage, which displays a list of their favorited stations --> view more station information and click on address to a pop out window with Google Map direction. 
2. Under profile tab, user can view their profile information, profile image, and edit this information. 
<p align="center">
  <img src="https://github.com/xieb3cky/Cstation_Frontend/blob/master/demo/login-profile.gif" alt="animated" />
</p> 

### Sign Up
Sign up form, user can create a new account by providing the requested information. 
<p align="center">
  <img src="https://github.com/xieb3cky/Cstation_Frontend/blob/master/demo/signupform.gif" alt="animated" />
</p> 




<!-- ## Goal -->
<!-- ## Set Up Instructions  -->
