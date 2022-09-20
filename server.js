const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()
const PORT = process.env.SERVER_PORT;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./db");
require("./routers")(app)
const server = app.listen(PORT, () => {
    console.log("[success] task 1 : Server running on port " + PORT)
})

const io = require('socket.io')(server, {
    cors: {
        origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"]
    }
});
require('./socket/room.socket')(io);