//IMPORTS
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
//routes
const routesUsers = require("./routes/users");
const routesExercises = require("./routes/exercises");
const routesRecords = require("./routes/records");

//SETUP
const server = express();

//MIDDLEWARE
server.use(helmet()); //security
server.use(cors()); //ensures front and back end can work from the same machine
server.use(express.json()); //json all the things!

//ROUTES
server.use("/api/users", routesUsers);
server.use("/api/exercises", routesExercises);
server.use("/api/records", routesRecords);

// API is online Notification
server.get("/", (req, res) => {
  res.send("<h1>API is online</h1>");
});

//EXPORTS
module.exports = server;
