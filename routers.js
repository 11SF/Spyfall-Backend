module.exports = (app) => {
    app.use("/api/location", require("./router/location.router"))
    app.use("/api/version", require("./router/version.router"))
    app.use("/api/room", require("./router/gameRoom.router"))
}



