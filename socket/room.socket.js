const { mapRequestBodyRoomToModelObject } = require("../adapter/room.adapter");
let GameRoomService = require("../service/gameRoom.service");
const { InternalError, InvalidDataError } = require("../utility/error");
const { buildResponse } = require("../utility/response");

module.exports = function (io) {
  io.sockets.on("connection", function (socket) {
    console.log("connected");
    socket.on("OWNER:CREATE-ROOM", async (data) => {
      try {
        let roomObject = mapRequestBodyRoomToModelObject(data);
        let result = await GameRoomService.create(roomObject);
        socket.emit("ROOM:SYS-MESSAGE", buildResponse(result));
      } catch (err) {
        socket.emit(
          "ROOM:SYS-MESSAGE",
          buildResponse(new InternalError(5080, err))
        );
      }
    });
    // Room Setting by Owner
    socket.on("OWNER:SETTING", async (data) => {
      try {
        let roomObject = mapRequestBodyRoomToModelObject(data);
        let result = await GameRoomService.update(roomObject);
        socket
          .to(result._id)
          .emit("ROOM:SYNC-SETTING", buildResponse(roomObject));
      } catch (err) {
        socket.emit(
          "ROOM:SYS-MESSAGE",
          buildResponse(new InternalError(5080, err))
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
        socket.emit("INGAME:COUNTDOEN", buildResponse(err));
      }
    });
    socket.on("OWNER:CLOSE-ROOM", async (data) => {
      let result;
      try {
        let roomObject = mapRequestBodyRoomToModelObject(data);
        result = await GameRoomService.remove(roomObject);
        socket.emit("ROOM:SYS-MESSAGE", buildResponse(result));
      } catch (err) {
        socket.emit("ROOM:SYS-MESSAGE", buildResponse(err));
        socket.to(result._id).emit("roomRemoved", buildResponse(err));
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
        console.log(room);
        if (room.length != 1 || room instanceof Error) {
          throw new InternalError(5080, result);
        }
        result = await GameRoomService.getSertPlayer(room[0]._id, playerId);
        console.log(result);

        socket.join(result._id);
        socket.emit("ROOM:SYS-MESSAGE", buildResponse(result));
        socket.to(result._id).emit("ROOM:SYS-MESSAGE", buildResponse(result));
      } catch (err) {
        socket.emit(
          "ROOM:SYS-MESSAGE",
          buildResponse(new InternalError(5080, err))
        );
      }
    });
    socket.on("disconnect", async () => {
      console.log("disconnected");
    });
  });
};
