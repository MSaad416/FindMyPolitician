import React, { useState, useEffect } from "react";
import Location from "./Location.js";
import PostalCode from "./PostalCode";
import Map from "./Map.js";

// instead of checking for for toggle here
// do so in the

// ensure that only relevant component is displayed
// function Check(props) {
//   if (props.toggle === "myLocation") {
//     console.log("LOCATION");
//     return <Location />;
//   } else if (props.toggle === "postalCode") {
//     console.log("POSTALCODE");
//     return <PostalCode />;
//   } else if (props.toggle === "mapLocation") {
//     console.log("MAPLOCATION");
//     return <Map />;
//   } else {
//     console.log("NULL");
//   }
// }

function ToggleOption({ onToggleData }) {
  const [toggle, setToggle] = useState("null");

  const onToggle = (e) => {
    setToggle(e.target.value);
    // invoke callback function to pass
    onToggleData(e.target.value);
    // Check(e.target.value);
    // console.log("CHANGE");
    // console.log(e.target.value);
  };

  // useEffect(() => {}, [toggle]);
  return (
    <div className="container-fluid">
      <div className="lead d-flex justify-content-center mt-3">
        To meet your political representatives choose one of the below options.
      </div>
      <div className="d-flex justify-content-center mt-2">
        <div className="btn-group ">
          <input
            type="radio"
            className="btn-check"
            name="options"
            value="myLocation"
            id="option1"
            checked={toggle === "myLocation"}
            onChange={onToggle}
          />
          <label className="btn btn-primary" htmlFor="option1">
            Use My Location
          </label>

          <input
            type="radio"
            className="btn-check"
            name="options"
            value="postalCode"
            id="option2"
            checked={toggle === "postalCode"}
            onChange={onToggle}
          />
          <label className="btn btn-primary" htmlFor="option2">
            Postal Code
          </label>

          <input
            type="radio"
            className="btn-check"
            name="options"
            value="mapLocation"
            id="option3"
            checked={toggle === "mapLocation"}
            onChange={onToggle}
          />
          <label className="btn btn-primary" htmlFor="option3">
            Map Location
          </label>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-2">
        {/* {console.log(toggle)} */}
        {/* Rendering only the desired data card component */}
        {/* <Check toggle={toggle} /> */}
      </div>
    </div>
  );
}

export default ToggleOption;
