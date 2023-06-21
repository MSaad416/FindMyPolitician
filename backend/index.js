import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// __dirname due to changing type: module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

// with react build folder
// app.use(express.static());

app.get("/", (req, res) => {
  res.send(`Node Server run @ ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Running at localhost: ${PORT}`);
});
