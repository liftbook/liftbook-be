//IMPORTS
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
//routes
const routesUsers = require('./routes/users')
const routesExercises = require('./routes/exercises')

//SETUP
const server = express()

//MIDDLEWARE
server.use(helmet()) //security
server.use(cors()) //ensures front and back end can work from the same machine
server.use(express.json()) //json all the things!

//ROUTES
server.use('/api/users', routesUsers)
server.use('/api/exercises', routesExercises)

//EXPORTS
module.exports = server