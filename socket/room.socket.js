const {
  mapRequestBodyPlayerToModelObject,
} = require("../adapter/player.adapter");
const { mapRequestBodyRoomToModelObject } = require("../adapter/room.adapter");
const GameRoomService = require("../service/gameRoom.service");
const PlayerService = require("../service/player.service");
const {
  InternalError,
  InvalidDataError,
  DataNotFound,
} = require("../utility/error");
const { buildResponse, buildSocketResponse } = require("../utility/response");

module.exports = function (io) {
  io.sockets.on("connection", function (socket) {
    console.log("connected" + " " + socket.id);
    socket.on("OWNER:CREATE-ROOM", async (data) => {
      try {
        let roomObject = mapRequestBodyRoomToModelObject(data);
        let query = {
          ownerId: roomObject.model.ownerId,
        };
        await setSocketId(roomObject.model.ownerId, socket.id);
        let foundRoom = await GameRoomService.find(query);
        if (foundRoom) {
          socket.join(foundRoom.code);
          return socket.emit(
            "ROOM:SYS-MESSAGE",
            buildSocketResponse(foundRoom[0], "OWNER:CREATE-ROOM")
          );
        } else {
          console.log(roomObject.model.players);
          let result = await GameRoomService.create(roomObject);
          console.log(result);
          console.log(result[0].players);

          let finalRoom = await GameRoomService.find({
            ownerId: result.ownerId,
          });
          console.log(finalRoom[0].players);

          socket.join(result.code);
          socket.emit(
            "ROOM:SYS-MESSAGE",
            buildSocketResponse(finalRoom[0], "OWNER:CREATE-ROOM")
          );
        }
      } catch (err) {
        socket.emit(
          "ROOM:SYS-MESSAGE",
          buildSocketResponse(new InternalError(5080, err), "OWNER:CREATE-ROOM")
        );
      }
    });
    // Room Setting by Owner
    socket.on("OWNER:SETTING", async (data) => {
      try {
        let roomObject = mapRequestBodyRoomToModelObject(data);
        let result = await GameRoomService.update(roomObject);
        socket
          .to(result.code)
          .emit(
            "ROOM:SYNC-SETTING",
            buildSocketResponse(roomObject, "OWNER:SETTING")
          );
      } catch (err) {
        socket.emit(
          "ROOM:SYS-MESSAGE",
          buildSocketResponse(new InternalError(5080, err), "OWNER:SETTING")
        );
      }
    });
    socket.on("OWNER:START-GAME", async (data) => {
      try {
        //Step 1 : Random Role to player
        let roles = await randomRoleToPlayer();

        let timer = data.minutes * 60,
          duration = data.minutes * 60,
          minutes,
          seconds;

        //random location & roles
        setInterval(function () {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          socket.to(data.roomId).emit(
            "INGAME:COUNTDOEN",
            buildResponse({
              time: minutes + ":" + seconds,
            })
          );
          socket.emit(
            "INGAME:COUNTDOEN",
            buildResponse({
              time: minutes + ":" + seconds,
            })
          );

          if (--timer < 0) {
            timer = duration;
          }
        }, 1000);
      } catch (err) {
        socket.emit("INGAME:COUNTDOEN", buildSocketResponse(err, ""));
      }
    });
    socket.on("OWNER:CLOSE-ROOM", async (data) => {
      let result;
      try {
        let roomObject = mapRequestBodyRoomToModelObject(data);
        result = await GameRoomService.remove(roomObject);
        socket.emit(
          "ROOM:SYS-MESSAGE",
          buildSocketResponse(result, "OWNER:CLOSE-ROOM")
        );
      } catch (err) {
        socket.emit(
          "ROOM:SYS-MESSAGE",
          buildSocketResponse(err, "OWNER:CLOSE-ROOM")
        );
        socket
          .to(result._id)
          .emit(
            "ROOM:SYS-MESSAGE",
            buildSocketResponse(err, "OWNER:CLOSE-ROOM")
          );
      }
      console.log(result);
    });
    socket.on("roomList", (data) => {
      console.log(socket.rooms);
    });
    socket.on("PLAYER:JOIN-ROOM", async (data) => {
      let result;
      let room;
      try {
        let { playerId, roomToken } = data;
        console.log(playerId);

        room = await GameRoomService.find({
          code: roomToken ? roomToken : null,
        });
        console.log("Socket");
        console.log(room);
        if (room.length != 1 || room instanceof Error) {
          throw new InternalError(5080, result);
        }
        result = await GameRoomService.getSertPlayer(room[0]._id, playerId);
        // result.players = room[0].players;

        // console.log(room[0].players);
        console.log(result);
        socket.join(result.code);
        socket.emit(
          "ROOM:SYS-MESSAGE",
          buildSocketResponse(result, "PLAYER:JOIN-ROOM")
        );
        socket
          .to(result.code)
          .emit(
            "ROOM:SYS-MESSAGE",
            buildSocketResponse(result, "PLAYER:JOIN-ROOM")
          );
        console.log(socket.rooms);
      } catch (err) {
        socket.emit(
          "ROOM:SYS-MESSAGE",
          buildResponse(new InternalError(5080, err))
        );
      }
    });
    socket.on("disconnect", async (data) => {
      try {
        console.log("disconnected");
        let roomObject = data;
        // let result = await GameRoomService.remove(roomObject);
        console.log(result);
      } catch (err) {
        socket.emit(
          "ROOM:SYS-MESSAGE",
          buildResponse(new InternalError(5080, err))
        );
      }
    });
  });
};

async function setSocketId(playerId, socketId) {
  if (!playerId || !socketId) {
    return;
  }
  let playerObject = mapRequestBodyPlayerToModelObject({
    id: playerId,
    socketId,
  });
  await PlayerService.update(playerObject);
}
