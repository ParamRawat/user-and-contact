const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./app/models");
const userRoutes = require("./app/routes/user.routes");
const contactRoutes = require("./app/routes/contact.routes");
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: "http://localhost:8080"
};

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(cors(corsOptions));

app.use('/user', userRoutes);
app.use('/contact', contactRoutes);


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});