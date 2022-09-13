const playerModel = require("../model/player.model");
const { InternalError, DataNotFound } = require("../utility/error");

async function create(playerObject) {
  let result;
  try {
    let newPlayer = new playerModel(playerObject.model);
    result = await newPlayer.save();
  } catch (err) {
    return new InternalError(5030, err);
  }
  return result;
}

async function find(playerObject) {
  let result;
  try {
    result = await playerModel.find({ _id: playerObject.id });
    if (result.length === 0) {
      return new DataNotFound(
        "Player id: '" + playerObject.id + "' id not found"
      );
    }
  } catch (err) {
    return new InternalError(5030, err);
  }
  return result;
}

async function update(playerObject) {
  let result;
  try {
    result = await playerModel.findByIdAndUpdate(
      {
        _id: playerObject.id,
      },
      {
        $set: {
          name: playerObject.model.name,
        },
      }
    );
  } catch (err) {
    return new InternalError(5030, err);
  }
  return result;
}

module.exports = { create, find, update };
