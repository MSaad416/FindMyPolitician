import { useState } from "react";
import "../Components/App/App";

// import { getData } from "./FetchData";

function PostalCode({ postcode, setPostalcode }) {
  // useState hook init to empty string
  // const [postalcode, setPostalcode] = useState("");
  const [tempCode, settempCode] = useState("");

  const handleChange = (e) => {
    // e.preventDefault();
    settempCode(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPostalcode(tempCode);
    // console.log("XXX");
    // console.log(event.target.value);
    // console.log("NOW DUBMITTED");
  };

  return (
    <div className="container-fluid">
      <div className="container-fluid">
        <div className="lead d-flex justify-content-center pt-4">Enter your postal code below</div>
      </div>

      <div className="container-fluid">
        <form onSubmit={handleSubmit} className="d-flex justify-content-center mt-3 mb-3">
          {console.log(postcode)}
          <input className="form-control w-auto" type="text" value={tempCode} onChange={handleChange} />
        </form>
      </div>
    </div>
  );
}

export default PostalCode;
