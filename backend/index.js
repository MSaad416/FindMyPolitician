import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

// __dirname due to changing type: module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

var latitude = 0;
var longitude = 0;

// with react build folder
// app.use(express.static());

const convertGeoData = async (postalCode) => {
  const params = {
    access_key: "bad9524e22348d9587f8b6ff5918fd23",
    query: `${postalCode}`,
    country: "CA",
  };
  try {
    const response = await axios.get("http://api.positionstack.com/v1/forward", { params, maxRedirects: 0 });
    // const latitude = response.data.data[0].latitude;
    // const longitude = response.data.data[0].longitude;
    // return { latitude, longitude };
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send(`Node Server run @ ${PORT}`);
});

app.get("/forward", (req, res) => {
  const { query } = req.query;

  // console.log(access_key);
  // console.log(query);
  // console.log(country);

  convertGeoData(query).then((response) => {
    if (response) {
      latitude = response.data.data[0].latitude;
      longitude = response.data.data[0].longitude;
      console.log("GEOCODING:");
      console.log(latitude);
      console.log(longitude);
    }
    // res.json(`latitude : ${latitude}, longitude:  ${longitude}`);
    res.json([latitude, longitude]);
  });

  // const latitude = data.data[0].latitude;
  // const longitude = data.data[0].longitude;
  // console.log("GEOCODING:");
  // console.log(data);
  // console.log(longitude);

  // res.send(`Node Server run @ ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Running at localhost: ${PORT}`);
});
