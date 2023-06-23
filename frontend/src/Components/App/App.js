import React, { useEffect, useState } from "react";
import "./App.css";
import ToggleOption from "../ToggleOption";
import Nav from "../Navigation/Nav";
import Location from "../Location";
import PostalCode from "../PostalCode";
import Map from "../Map";
import MainData from "../MainData/MainData";
import axios from "axios";

// import politics from "./politics.png"

// import Data from "../../data.json";

//  https://represent.opennorth.ca/representatives/house-of-commons/?point=43.885,-79.053

function App() {
  const [isHovering, setisHovering] = useState(false);

  const [toggleData, settoggleData] = useState("null");

  // stupid state management: lifting up data states to main app :(
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

  const handleMouseOver = () => {
    setisHovering(true);
  };

  const handleMouseOut = () => {
    setisHovering(false);
  };

  // const handleMouseOut = () => {
  //   setisHovering(false);
  //   settoggleData("main");
  // };

  // const handleShowClick = () => {
  //   settoggleData("main");
  // };

  // const convertGeoData = async (postalCode) => {
  //   const params = {
  //     access_key: "bad9524e22348d9587f8b6ff5918fd23",
  //     query: `${postalCode}`,
  //     country: "CA",
  //   };
  //   try {
  //     const response = await axios.get("http://api.positionstack.com/v1/forward", { params, maxRedirects: 0 });
  //     console.log("GEOCODING:");
  //     console.log(response.data);
  //     // return response.data;
  //   } catch (err) {
  //     console.log(err);
  //     return null;
  //   }

  //   // const res = await axios
  //   //   .get("http://www.api.positionstack.com/v1/forward", { params })
  //   //   .then((response) => {
  //   //     console.log("GEOCODING:");
  //   //     console.log(response.data);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log("GEOCODING: ERROR");
  //   //     console.log(error);
  //   //   });
  // };

  // coOrdinates -> location
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
      // console.log(`https://represent.opennorth.ca/postcodes/${formattedPS}/?sets=federal-electoral-districts`);

      try {
        // convertGeoData(postalCode);
        // const response = await axios.get(`https://represent.opennorth.ca/postcodes/${formattedPS}`);
        // return response.data;
        // http://localhost:4000/forward?access_key=bad9524e22348d9587f8b6ff5918fd23&query=l1t4e1&country=CA
        // const res = await axios.get(`http://localhost:4000/forward?query=${postalCode}`);
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
    // setresData(getData(toggleData, location, postalCode));
    // console.log(`GetDATA: ${getData(toggleData, location, postalCode)}`);
    // setresData(getData(toggleData, location, postalCode));
  }, [toggleData, location, postalCode]);

  return (
    <div className="App">
      <Nav />

      <ToggleOption onToggleData={handleToggleData} />

      {toggleData === "null" && (
        <>
          {/* <div className="container-fluid justify-contents-center align-items-center">
            <div className="d-flex justify-contents-center align-items-center"></div>
          </div> */}
          <div className="">
            <div
              className="container-fluid mt-5"
              style={{ maxWidth: "1000px" }}
              onMouseEnter={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <div className="text-center">
                <div className="position-relative">
                  <div>
                    <img
                      src={require("./politics.png")}
                      className="img-fluid mx-auto d-block"
                      alt="..."
                      style={{ borderRadius: "4%", opacity: 1 }}
                    />
                    <div className="overlay">
                      <h2>
                        {" "}
                        Get to know who represents the will of the people in your region. <br></br>{" "}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* {`Loading: ${isLoading}`} */}
      {/* {console.log(isLoading)}
      {console.log(resData)}
      {console.log(isLoading)} */}

      {/* {console.log(`RizzData: ${resData}`)} */}
      {/* {setresData(getData(toggleData, location, postalCode))} */}

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

      {/* {isHovering && (
        <>
          <div className="text-center pt-5"> Whack Me </div>
        </>
      )} */}

      {isLoading === true && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status" style={{ width: "100px", height: "100px" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {/* 
      {console.log(`Bruh: ${postalCode}`)}
      {(dat = getData(toggleData, location, postalCode))}
      {console.log(dat)} */}
      {/* {console.log(`Blud is: `, toggleData, location, postalCode)} */}
      {/* <MainData /> */}
      {/* <PostalCode /> */}
      {/* <Location /> */}
    </div>
  );
}

export default App;
