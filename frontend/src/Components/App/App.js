import React, { useEffect, useState } from "react";
import "./App.css";
import ToggleOption from "../ToggleOption/ToggleOption";
import Nav from "../Navigation/Nav";
import Location from "../Location";
import PostalCode from "../PostalCode";
import Map from "../Map";
import MainData from "../MainData/MainData";
import axios from "axios";
import MainArt from "../MainArt/MainArt";
// import politics from "./politics.png"

// import Data from "../../data.json";

//  https://represent.opennorth.ca/representatives/house-of-commons/?point=43.885,-79.053

function App() {
  const [toggleData, settoggleData] = useState("null");

  // stupid state management: lifted data states up to main app :(
  const [location, setLocation] = useState([]);
  const [postalCode, setPostalcode] = useState("");

  const [isLoading, setIsLoading] = useState(false);

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

  // coOrdinates -> fetch data from OPENNORTH API -> pass state props to components
  // NEXT TO-DO: SHIFTING this logic to the backend will be better

  const getData = async (toggle, coOrdinates, postalCode) => {
    const regex = /^[A-Z]\d[A-Z]\d[A-Z]\d$/;
    const formattedPS = postalCode.toUpperCase().replaceAll(" ", "");

    if (toggle === "myLocation" && coOrdinates.length > 1) {
      console.log("X RAN");
      console.log(coOrdinates.length);
      console.log(toggle);
      console.log(coOrdinates);

      try {
        const response = await axios.get(
          `https://represent.opennorth.ca/representatives/?point=${coOrdinates[0]},${coOrdinates[1]}`
        );

        console.log(coOrdinates[0]);
        console.log(coOrdinates[1]);

        return response.data;
      } catch (err) {
        console.log(err);
        return null;
      }
    } else if (toggle === "postalCode" && formattedPS !== "" && regex.test(formattedPS)) {
      try {
        // response will contain co-ordinates converted from a given postal code
        // magic to convert geo-data happens on the backend
        const res = await axios.get("http://localhost:4000/forward", {
          params: {
            query: postalCode,
          },
        });

        console.log(res.data);
        // const lat = res.latitude;
        // const long = res.longitude;
        return getData("myLocation", res.data, "");
      } catch (err) {
        console.log(err);
        return null;
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getData(toggleData, location, postalCode);
        setresData(data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [toggleData, location, postalCode]);

  return (
    <div className="App">
      <Nav />

      <ToggleOption onToggleData={handleToggleData} />

      {toggleData === "null" && <MainArt />}

      {console.log(resData)}

      {toggleData === "myLocation" && (
        <>
          <Location location={location} setLocation={handleLocationData} />
          <MainData data={resData} loading={isLoading} />
        </>
      )}
      {toggleData === "postalCode" && (
        <>
          <PostalCode postcode={postalCode} setPostalcode={handlePostalData} />
          <MainData data={resData} loading={isLoading} />
        </>
      )}
      {toggleData === "mapLocation" && <Map />}

      {isLoading === true && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status" style={{ width: "100px", height: "100px" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
