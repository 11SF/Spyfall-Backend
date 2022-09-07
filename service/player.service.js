const PlayerRepository = require("../repository/player.repository");
const { InternalError } = require("../utility/error");

async function create(playerObject) {
  let result;
  try {
    result = await PlayerRepository.create(playerObject);
  } catch (err) {
    return new InternalError(5020, err);
  }
  return result;
}

async function find(playerObject) {
  let result;
  try {
    result = await PlayerRepository.find(playerObject);
  } catch (err) {
    return new InternalError(5020, err);
  }
  return result;
}

async function update(playerObject) {
  let result;
  try {
    result = await PlayerRepository.update(playerObject);
  } catch (err) {
    return new InternalError(5020, err);
  }
  return result;
}

module.exports = { create, find, update };
