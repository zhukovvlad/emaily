const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./models/Survey");
require("./services/passport");
// const authRoutes = require("./routes/authRoutes");

mongoose.set("strictQuery", false);
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
// require("./routes/surveyRouter")(app);

if (process.env.NODE_ENV === "production") {
  //  Express will serve up droduction assets
  //  like our main.js or main.css
  const path = require("path");
  app.use(express.static(path.join(__dirname, "/client/build")));

  //  Express will serve up the index.html file
  // if it doesn't recognize the route
  // const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
