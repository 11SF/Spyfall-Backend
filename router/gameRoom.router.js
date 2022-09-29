const { mapRequestBodyRoomToModelObject } = require("../adapter/room.adapter");
const gameRoomService = require("../service/gameRoom.service");
const { InternalError } = require("../utility/error");
const { buildResponse } = require("../utility/response");
const router = require("express").Router();

router.get("/", async (req, res) => {
  let result;
  try {
    result = await gameRoomService.find(req.query);
  } catch (err) {
    result = new InternalError(5010, err);
  }
  return res.json(buildResponse(result));
});
router.get("/getUserRoom", async (req, res) => {
  let result;
  try {
    result = await gameRoomService.findUserInRoom(req.query);
  } catch (err) {
    result = new InternalError(5010, err);
  }
  return res.json(buildResponse(result));
});
router.post("/", async (req, res) => {
  let result;
  try {
    let newRoomObject = mapRequestBodyRoomToModelObject(req.body);
    result = await gameRoomService.create(newRoomObject);
  } catch (err) {
    result = new InternalError(5010, err);
  }
  return res.json(buildResponse(result));
});
router.put("/", async (req, res) => {
    let result;
    try {
      let newRoomObject = mapRequestBodyRoomToModelObject(req.body);
      result = await gameRoomService.update(newRoomObject);
    } catch (err) {
      result = new InternalError(5010, err);
    }
    return res.json(buildResponse(result));
  });
router.delete("/", async (req, res) => {
  let result;
  try {
    let newRoomObject = mapRequestBodyRoomToModelObject(req.body);
    result = await gameRoomService.remove(newRoomObject);
  } catch (err) {
    result = new InternalError(5010, err);
  }
  return res.json(buildResponse(result));
});

module.exports = router;
