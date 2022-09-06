const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const gameRoomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  ownerId: {
    type: String,
    required: true,
    unique: true,
  },
  players: [
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      role: {
        type: String,
      },
    },
  ],
  roundTime: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("gameRoom", gameRoomSchema);
