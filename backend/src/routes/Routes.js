import bodyParser from "body-parser";

const Routes = (app) => {
  app.use(bodyParser.json());
  app.route("/");
};

// MVC Architecture

// create route diagram

// GET with co-ordinates

// TAKE RESPONSE AND SEND TO FRONT END
