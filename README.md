
# C Station

***** WORK IN PROGRESS ****

Search for electric car chargers based on user's input location.

## Technologies
 - React
 - JavaScript
 - Node.js/Express


## APIs
 - [Open Charger Map API](https://openchargemap.org/site)
   - Utilizied to find electric car charging stations based on geo location. 
   - Filters {latitude, longitude, charger type, max result} => sent to Open Charger Map API.
 - [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
   - Utilized to create custom maps with markers to display each charging stations on google map.
   - Autocomplete, a feature of the Places libary, provides 'type-ahead-search behavior',helping user match on full words and substrings, resolving places name, addresses, and codes. 



## Acknowledgements

 - [Landing page background video](https://www.youtube.com/watch?v=M32bzsBswAk)
 - [Animated blue car](https://codepen.io/gvissing/pen/RwBMxKj)
  
## Features 
 - New user registration
 - Log in/log out for returing user
 - Save/favorite a charging station
 - Leave reviews for a charging station (***work in progress***)
 - Search for electric car chargers base on user's input geo location
  
## Demo

### Homepage 
Landing page consist of background video credit above. Navbar contains options for search, quick search, log in and sign up. User can perform a 'quick search' which takes user's current location and search for chargers OR 'search' which requires additional information.
<p align="center">
  <img src="https://github.com/xieb3cky/Cstation_Frontend/blob/master/demo/landing-pagegif.gif" alt="animated" />
</p>

### Search Form 
Search form displays autocomplete input box, where user can type in text based location and autocomplete will provide suggestions/predictions. Next, user will select charger types, common charger types are Tesla, CCS1, CHAdeMoO, J-Plug. Lastly, select maximum result and hit search!
<p align="center">
  <img src="https://github.com/xieb3cky/Cstation_Frontend/blob/master/demo/search.gif" alt="animated" />
</p>

### Search Result
After user completes search form, a GET request is sent to Open Charge Map API with the form data. From the API, we recieve a list of charging stations. Then, for each charging stations, we utilize React components to render charging stations list => charging station card to display information regarding each station. User can also favorite/un-favorite each station which will save the charging station to our database. 

<p align="center">
  <img src="https://github.com/xieb3cky/Cstation_Frontend/blob/master/demo/search-result-gif.gif" alt="animated" />
</p> 

### Log In 
Log in form, welcomes returning user and requires username and password.
<p align="center">
  <img src="https://github.com/xieb3cky/Cstation_Frontend/blob/master/demo/signin.gif" alt="animated" />
</p> 

### Sign Up
Sign up form, user can create a new account by providing requested information. 
<p align="center">
  <img src="https://github.com/xieb3cky/Cstation_Frontend/blob/master/demo/signupform.gif" alt="animated" />
</p> 