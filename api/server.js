//imports
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

//setup
const server = express()

//middleware
server.use(helmet()) //security
server.use(cors()) //ensures front and back end can work from the same machine
server.use(express.json()) //json all the things!

//exports
module.exports = server