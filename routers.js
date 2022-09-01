module.exports = (app) => {
    app.use("/api/location", require("./router/location.router"))
    app.use("/api/version", require("./router/version.router"))
}



