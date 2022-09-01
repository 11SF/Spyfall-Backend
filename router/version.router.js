const router = require("express").Router();
const service = require("../service/version.service")
const { buildResponse } = require("../utility/response")
require("dotenv").config();


router.get("/", (req, res) => {
    let result
    try {
        result = service.getServiceVersion()
    } catch (err) {
        return res.status(500).json(
            buildResponse(null, err)
        )
    }
    return res.json(
        buildResponse(result, null)
    )
})


module.exports = router