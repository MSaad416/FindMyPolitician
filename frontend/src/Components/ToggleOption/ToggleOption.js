import React, { useState } from "react";

function ToggleOption({ onToggleData }) {
  const [toggle, setToggle] = useState("null");

  const onToggle = (e) => {
    setToggle(e.target.value);
    // invoke callback function to pass
    onToggleData(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="lead d-flex justify-content-center pt-5">
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
      <div className="d-flex justify-content-center mt-2"></div>
    </div>
  );
}

export default ToggleOption;
