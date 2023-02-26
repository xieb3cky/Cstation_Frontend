import React from "react";
import "./Loading.css";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
    <div className="loader">
      <div class="container">
        <div class="fill">
          <div class="bar bar1"></div>
          <div class="bar bar2"></div>
          <div class="bar bar3"></div>
          <div class="bar bar4"></div>
          <div class="bar bar5"></div>
          <div class="cap"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;