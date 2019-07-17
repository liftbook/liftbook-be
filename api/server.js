//IMPORTS
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
//routes
const routesLogs = require("./routes/logs");
const routesUsers = require("./routes/users");
const routesExercises = require("./routes/exercises");
const routesRecords = require("./routes/records");
const routesGoals = require("./routes/goals");
const routesPhotos = require("./routes/photos");

//SETUP
const server = express();

//MIDDLEWARE
server.use(helmet()); //security
server.use(cors()); //ensures front and back end can work from the same machine
server.use(express.json()); //json all the things!

//ROUTES

server.use("/api/logs", routesLogs);
server.use("/api/users", routesUsers);
server.use("/api/exercises", routesExercises);
server.use("/api/records", routesRecords);
server.use("/api/goals", routesGoals);
server.use("/api/photos", routesPhotos);

// API is online Notification
server.get("/", (req, res) => {
  res.send("<h1>API is online</h1>");
});

//EXPORTS
module.exports = server;
