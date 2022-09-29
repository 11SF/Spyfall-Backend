const gameRoomReposotory = require("../repository/gameRoom.repository");
const locationRepository = require("../repository/location.repository");
const {
  InternalError,
  DataNotFound,
  InvalidDataError,
} = require("../utility/error");

async function find(query) {
  let result;
  let filter = {};
  try {
    if (query?.code) {
      filter["code"] = query.code;
    } else if (query?.ownerId) {
      filter["ownerId"] = query.ownerId;
    }
    result = await gameRoomReposotory.find(filter);
    if (result.length === 0) {
      return null
    }
  } catch (err) {
    return new InternalError(5020, err);
  }
  return result;
}

async function findUserInRoom(query) {
  let result;
  try {
    let { playerId } = query;
    result = await gameRoomReposotory.findUserInRoom(playerId);
    if (!result) {
      return new DataNotFound(1020, result);
    }
    let filter = {
      code: result?.code,
    };
    result = await gameRoomReposotory.find(filter);
    console.log(result);
  } catch (err) {
    return new InternalError(5020, err);
  }
  return result;
}

async function create(roomObject) {
  let result;
  roomObject.model.code = randomToken(5);
  try {
    result = await gameRoomReposotory.create(roomObject);
    let filter = {
      code: roomObject.model.code,
    };
    result = await gameRoomReposotory.find(filter);
  } catch (err) {
    return new InternalError(5020, err);
  }
  return result;
}

async function updateSetting(roomObject) {
  let result;
  try {
    result = await gameRoomReposotory.updateSetting(roomObject);
  } catch (err) {
    return new InternalError(5020, err);
  }
  return result;
}

async function update(roomObject) {
  let result;
  try {
    result = await gameRoomReposotory.updatePlayers(roomObject);
  } catch (err) {
    return new InternalError(5020, err);
  }
  return result;
}

async function getSertPlayer(roomId, playerId) {
  let result;
  try {
    result = await gameRoomReposotory.findUserInRoom(playerId);
    if (result) {
      let filter = {
        code: result?.code,
      };
      result = await gameRoomReposotory.find(filter);
      return result;
    }

    if (!roomId || !playerId) {
      return new InvalidDataError(5020, "");
    }
    result = await gameRoomReposotory.addPlayer(roomId, playerId);
    let filter = {
      code: result?.code,
    };
    result = await gameRoomReposotory.find(filter);
  } catch (err) {
    return new InternalError(5020, err);
  }
  return result;
}

async function remove(roomObject) {
  let result;
  try {
    result = await gameRoomReposotory.remove(roomObject);
  } catch (err) {
    return new InternalError(5020, err);
  }
  return result;
}

async function randomRoleToPlayer(locationObject) {
  let result;
  try {
    location = await locationRepository.find(locationObject.id);
    result = await repository.remove(locationObject);
  } catch (err) {
    return new InternalError(5020, err);
  }
  return result;
}

function randomToken(length) {
  let result = "#";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
  find,
  create,
  update,
  getSertPlayer,
  remove,
  randomRoleToPlayer,
  findUserInRoom,
  updateSetting,
};
