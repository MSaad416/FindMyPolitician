import { useState } from "react";
import "./App.css";
import ToggleOption from "../ToggleOption";
import Nav from "../Navigation/Nav";
import Location from "../Location";
import PostalCode from "../PostalCode";
import Map from "../Map";
import MainData from "../MainData";
import axios from "axios";

//  https://represent.opennorth.ca/representatives/house-of-commons/?point=43.885,-79.053

function App() {
  const [toggleData, settoggleData] = useState("null");
  let dat = {};

  // stupid state management: lifting up data states to main app :(
  const [location, setLocation] = useState([]);
  const [postalCode, setPostalcode] = useState("");

  // response from api calls
  const [resData, setresData] = useState({});

  const handleToggleData = (data) => {
    settoggleData(data);
  };

  const handleLocationData = (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    // set Hook
    setLocation((arr) => [...arr, lat, long]);
  };

  const handlePostalData = (data) => {
    setPostalcode(data);
  };

  // coOrdinates -> location
  const getData = (toggle, coOrdinates, postalCode) => {
    const regex = /^[a-zA-Z0-9]{6,}$/;
    const formattedPS = postalCode.toUpperCase().replaceAll(" ", "");

    if (toggle === "myLocation" && coOrdinates.length > 1) {
      axios
        .get(`https://represent.opennorth.ca/representatives/house-of-commons/?point=${coOrdinates[0]},${coOrdinates[1]}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else if (toggle === "postalCode" && formattedPS !== "" && regex.test(formattedPS)) {
      // console.log(`https://represent.opennorth.ca/postcodes/${formattedPS}/?sets=federal-electoral-districts`);
      axios
        .get(`https://represent.opennorth.ca/postcodes/${formattedPS}/?sets=federal-electoral-districts`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="App">
      <Nav />
      <ToggleOption onToggleData={handleToggleData} />
      {toggleData === "myLocation" && (
        <>
          <Location location={location} setLocation={handleLocationData} />
          <MainData />
        </>
      )}
      {toggleData === "postalCode" && (
        <>
          <PostalCode postcode={postalCode} setPostalcode={handlePostalData} />
          <MainData />
        </>
      )}
      {toggleData === "mapLocation" && <Map />}

      {console.log(`Bruh: ${postalCode}`)}
      {(dat = getData(toggleData, location, postalCode))}
      {console.log(dat)}
      {/* {console.log(`Blud is: `, toggleData, location, postalCode)} */}
      {/* <MainData /> */}
      {/* <PostalCode /> */}
      {/* <Location /> */}
    </div>
  );
}

export default App;
