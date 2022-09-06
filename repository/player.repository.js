const playerModel = require("../model/player.model");
const { InternalError } = require("../utility/error");

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

module.exports = { create };
