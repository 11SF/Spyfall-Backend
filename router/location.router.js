const router = require("express").Router();
const { mapRequestBodyLocationToModel } = require("../adapter/location.adapter");
const service = require("../service/location.service");
const { InternalError } = require("../utility/error");
const { buildResponse } = require("../utility/response")
require("dotenv").config();

router.get("/", async (req, res) => {
    let result
    try {
        result = await service.find(req.query)
    } catch (err) {
        result = new InternalError(5010, err)
    }
    return res.json(
        buildResponse(result)
    )
})

router.post("/", async (req, res) => {
    let result
    try {
        let newLocation = mapRequestBodyLocationToModel(req.body)
        result = await service.create(newLocation)
    } catch (err) {
        result = new InternalError(5010, err)
    }
    return res.json(
        buildResponse(result)
    )
})

module.exports = router