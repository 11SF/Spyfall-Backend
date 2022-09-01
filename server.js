const express = require('express')
const app = express()
const db = require("./db");

require('dotenv').config()
const PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./routers")(app)
app.listen(PORT, ()=> {
    console.log("[success] task 1 : Server running on port " + PORT)
})
