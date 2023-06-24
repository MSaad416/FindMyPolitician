import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import dotenv from "dotenv";

// __dirname due to changing type: module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

var latitude = 0;
var longitude = 0;

// with react build folder
// app.use(express.static());

const convertGeoData = async (postalCode, access_key) => {
  const params = {
    access_key: access_key,
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

  convertGeoData(query, process.env.ACCESS_KEY).then((response) => {
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
});

app.listen(PORT, () => {
  console.log(`Running at localhost: ${PORT}`);
});
