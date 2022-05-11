require("dotenv").config()

const express = require('express')
const morgan = require('morgan')
const helmet = require("helmet");

const mysql = require("mysql2")
global.connection = mysql.createConnection(process.env.DATABASE_URL);

const app = express()
const port = 3000

const usersRoute = require('./routes/users_route')
const eventsRoute = require('./routes/events_route')
const assistancesRoute = require('./routes/assistances_route')
const messagesRoute = require('./routes/messages_route')
const friendsRoute = require('./routes/friends_route')

app.use(morgan('tiny'))
app.use(helmet());
app.use(express.json())  // convierte el body (bytes) -> objeto json

app.use('/users', usersRoute)
app.use('/events', eventsRoute)
app.use('/assistances', assistancesRoute)
app.use('/messages', messagesRoute)
app.use('/friends', friendsRoute)

app.get('*', (req, res) => {
    res.json({ error: "404"})
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})