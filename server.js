const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse peticiones de content-type - application/json
app.use(express.json());

// Parsear peticiones de content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// Ruta simple para test
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido al Club de lectura -USC" });
});

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

  require("./app/routes/bookRoutes")(app);

// Configurar puerto para recibir peticiones
const PORT = process.env.PORT || 443;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.`);
});