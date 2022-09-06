const gameRoomRepo = require("../model/gameRoom.model");
const { InternalError } = require("../utility/error");

async function find(filter) {
  let result;
  try {
    result = await gameRoomRepo.find(filter);
  } catch (err) {
    return new InternalError(5030, err);
  }
  return result;
}

async function findUserInRoom(playerId) {
  let result;
  try {
    result = await gameRoomRepo.findOne({
      players: {
        $elemMatch: {
          id: playerId,
        },
      },
    });
  } catch (err) {
    return new InternalError(5030, err);
  }
  return result;
}

async function create(roomObject) {
  let result;
  try {
    const newRecord = new gameRoomRepo(roomObject.model);
    result = await newRecord.save();
  } catch (err) {
    return new InternalError(5030, err);
  }
  return result;
}

async function update(roomObject) {
  let result;
  try {
    result = await gameRoomRepo.findByIdAndUpdate(
      {
        _id: roomObject.id,
      },
      {
        $set: {
          players: roomObject.model.players,
        },
      }
    );
  } catch (err) {
    return new InternalError(5030, err);
  }
  return result;
}

async function addPlayer(roomId, playerId) {
  let result;
  try {
    let playerIdObject = {
      id: playerId,
    };
    console.log(playerIdObject);
    result = await gameRoomRepo.findByIdAndUpdate(
      {
        _id: roomId,
      },
      {
        $push: {
          players: playerIdObject,
        },
      }
    );
  } catch (err) {
    return new InternalError(5030, err);
  }
  return result;
}

async function remove(roomObject) {
  let result;
  try {
    result = await gameRoomRepo.findByIdAndDelete({ _id: roomObject.id });
  } catch (err) {
    return new InternalError(5030, err);
  }
  return result;
}

module.exports = { find, findUserInRoom, create, update, addPlayer, remove };
