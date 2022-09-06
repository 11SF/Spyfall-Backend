const { mapRequestBodyRoomToModelObject } = require("../adapter/room.adapter");
let GameRoomService = require("../service/gameRoom.service");
const { InternalError, InvalidDataError } = require("../utility/error");
const { buildResponse } = require("../utility/response");

module.exports = function (io) {
  io.sockets.on("connection", function (socket) {
    console.log("connected");
    socket.on("createRoom", async (data) => {
      try {
        let roomObject = mapRequestBodyRoomToModelObject(data);
        console.log(roomObject);
        let result = await GameRoomService.create(roomObject);
        console.log(result);
        socket.join(result._id);
        socket.emit("userJoinedMsg", buildResponse(result));
      } catch (err) {
        socket.emit("roomMsg", buildResponse(new InternalError(5080, err)));
      }
      // socket.to(result._id).emit("userJoinedMsg", data.userId + " เข้ามาแล้ววววว");
    });
    socket.on("joinRoom", async (data) => {
      let result;
      let room;
      try {
        let { playerId, newJoinFlag, roomToken } = data;
        console.log(playerId);

        room = await GameRoomService.find({
          code: roomToken ? roomToken : null,
        });
        console.log(room);
        if (room.length != 1 || room instanceof Error) {
          throw new InternalError(5080, result);
        }
        result = await GameRoomService.upsertPlayer(room[0]._id, playerId);
        console.log(result);

        socket.join(result._id);
        socket.emit("roomMsg", playerId + " เข้ามาแล้ววววว");

        socket.to(result._id).emit("roomMsg", playerId + " เข้ามาแล้ววววว");
      } catch (err) {
        socket.emit("roomMsg", buildResponse(new InternalError(5080, err)));
      }
    });
    socket.on("roomList", (data) => {
      console.log(socket.rooms);
    });
    socket.on("startGame", (data) => {
      let timer = 8 * 60,
        duration = 8 * 60,
        minutes,
        seconds;
      setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        socket.to(data.roomId).emit("countdown", minutes + ":" + seconds);
        socket.emit("countdown", minutes + ":" + seconds);

        if (--timer < 0) {
          timer = duration;
        }
      }, 1000);
    });
    socket.on("closeRoom", async (data) => {
      let result;
      try {
        let roomObject = mapRequestBodyRoomToModelObject(data);
        result = await GameRoomService.remove(roomObject);
        socket.emit("roomMsg", buildResponse(result));
      } catch (err) {
        socket.emit("roomMsg", buildResponse(err));
        socket.to(result._id).emit("roomRemoved", buildResponse(err));
      }
      console.log(result);
    });
    socket.on("disconnect", async () => {
      console.log("disconnected");
    });
  });
};
