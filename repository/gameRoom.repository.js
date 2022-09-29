const gameRoomRepo = require("../model/gameRoom.model");
const { InternalError } = require("../utility/error");

async function find(filter) {
  let result;
  console.log(filter);
  try {
    result = await gameRoomRepo.aggregate([
      {
        $match: filter,
      },
      { $unwind: "$players" },
      {
        $addFields: {
          playerIdObj: { $toObjectId: "$players.id" },
        },
      },
      {
        $lookup: {
          from: "players",
          localField: "playerIdObj",
          foreignField: "_id",
          as: "playerInfo",
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          code: { $first: "$code" },
          mode: { $first: "$mode" },
          ownerId: { $first: "$ownerId" },
          roundTime: { $first: "$roundTime" },
          location: { $first: "$location" },
          numOfSpy: { $first: "$numOfSpy" },
          players: { $push: { $first: "$playerInfo" } },
        },
      },
    ]);
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

async function updateSetting(roomObject) {
  let result;
  let newSetting = {
    mode: roomObject.model.mode,
    ownerId: roomObject.model.ownerId,
    roundTime: roomObject.model.roundTime,
    location: roomObject.model.location,
    numOfSpy: roomObject.model.numOfSpy,
  };
  try {
    result = await gameRoomRepo.findByIdAndUpdate(
      {
        _id: roomObject.id,
      },
      {
        $set: newSetting,
      }
    );
  } catch (err) {
    return new InternalError(5030, err);
  }
  return result;
}

async function updatePlayers(roomObject) {
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

module.exports = {
  find,
  findUserInRoom,
  create,
  updatePlayers,
  updateSetting,
  addPlayer,
  remove,
};
