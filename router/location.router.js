const router = require("express").Router();
const {
  mapRequestBodyLocationToModelObject,
} = require("../adapter/location.adapter");
const service = require("../service/location.service");
const { InternalError, InvalidDataError } = require("../utility/error");
const { buildResponse } = require("../utility/response");
require("dotenv").config();

router.get("/", async (req, res) => {
  let result;
  try {
    result = await service.find(req.query);
  } catch (err) {
    result = new InternalError(5010, err);
  }
  return res.json(buildResponse(result));
});

router.post("/", async (req, res) => {
  let result;
  try {
    let newLocationObject = mapRequestBodyLocationToModelObject(req.body);
    result = await service.create(newLocationObject);
  } catch (err) {
    if (err instanceof InvalidDataError) {
      result = err;
    } else {
      result = new InternalError(5010, err);
    }
  }
  return res.json(buildResponse(result));
});

router.put("/", async (req, res) => {
  let result;
  try {
    let location = mapRequestBodyLocationToModelObject(req.body);
    result = await service.update(location);
  } catch (err) {
    if (err instanceof InvalidDataError) {
      result = err;
    } else {
      result = new InternalError(5010, err);
    }
  }
  return res.json(buildResponse(result));
});

router.delete("/", async (req, res) => {
  let result;
  try {
    let location = mapRequestBodyLocationToModelObject(req.body);
    result = await service.remove(location);
  } catch (err) {
    if (err instanceof InvalidDataError) {
      result = err;
    } else {
      result = new InternalError(5010, err);
    }
  }
  return res.json(buildResponse(result));
});

module.exports = router;
