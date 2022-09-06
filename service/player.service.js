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

module.exports = { create };
