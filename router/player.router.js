const router = require("express").Router();
const { mapRequestBodyPlayerToModelObject } = require("../adapter/player.adapter");
const PlayerService = require("../service/player.service");
const { InternalError } = require("../utility/error");
const { buildResponse } = require("../utility/response");

router.post("/", async (req, res) => {
  let result;
  try {
    let playerObject = mapRequestBodyPlayerToModelObject(req.body)
    result = await PlayerService.create(playerObject);
  } catch (err) {
    result = new InternalError(5010, err);
  }
  return res.json(buildResponse(result));
});

router.get("/", async (req, res) => {
  let result;
  try {
    let playerObject = mapRequestBodyPlayerToModelObject(req.query)
    result = await PlayerService.find(playerObject);
  } catch (err) {
    result = new InternalError(5010, err);
  }
  return res.json(buildResponse(result));
});

router.put("/", async (req, res) => {
  let result;
  try {
    let playerObject = mapRequestBodyPlayerToModelObject(req.body)
    result = await PlayerService.update(playerObject);
  } catch (err) {
    result = new InternalError(5010, err);
  }
  return res.json(buildResponse(result));
});

module.exports = router;
