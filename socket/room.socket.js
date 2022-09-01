module.exports = function (io) {
    io.sockets.on("connection", function (socket) {
        console.log("connected");
        // Broadcasts a message
        // socket.join(socket.data.roomId)
        socket.on("createRoom", (data) => {
            socket.join(data.roomId)
            socket.to(data.roomId).emit('user joined', data.userId + " is comming");
        });
        socket.on("roomList", (data) => {
            console.log(socket.rooms);
        })
        socket.on("disconnect", () => {
            console.log("disconnect");
            console.log(socket.rooms);
        })
    });
};
