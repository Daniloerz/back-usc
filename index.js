const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenidos a Club de Lectura-USC" });
});

require("./app/routes/bookRoutes.js")(app);
require("./app/routes/clubRoutes.js")(app);
require("./app/routes/userRoutes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 443;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});