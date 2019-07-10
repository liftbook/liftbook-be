require('dotenv')

const server = require('./api/server')

const port = process.env.PORT || 4444

server.listen(port, () => {
    console.log(`\n*** Go ahead, make my port ${port}!***\n`)
})