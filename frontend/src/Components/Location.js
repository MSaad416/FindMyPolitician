import React, { useState } from "react";

function Location({ location, setLocation }) {
  // const [location, setLocation] = useState([]);

  const checkLocation = () => {
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(setLocation, error);
    else console.log("Geolocation not detected.");
  };

  function success(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    // location.push(lat);
    // location.push(long);

    // alternative to pushing values
    // setLocation((arr) => [...arr, lat, long]);

    console.log(`Latitude: ${lat} Longitude: ${long}`);
  }

  function error() {
    alert("Unable to retrieve your location. Try a different option.");
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center pt-4">
        {/* <button onClick={checkLocation}>Get Location</button> */}
        {location.length === 0 ? (
          <button className="btn btn-outline-dark" onClick={checkLocation}>
            Get Location
          </button>
        ) : null}
        {location.length !== 0 ? `Your location coordinates were found as: ${location[0]}, ${location[1]}` : null}
      </div>
    </div>
  );
}

export default Location;
