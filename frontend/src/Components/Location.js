import React from "react";

function Location({ location, setLocation }) {
  const checkLocation = () => {
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(setLocation, error);
    else console.log("Geolocation not detected.");
  };

  function error() {
    alert("Unable to retrieve your location. Try a different option.");
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center pt-4">
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
