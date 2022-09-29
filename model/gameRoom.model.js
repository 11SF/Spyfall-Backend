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
  mode: {
    type: String,
    require: true,
    default: "0",
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
  location: [
    {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      state: {
        type: Boolean,
        required: true,
      },
    },
  ],
  numOfSpy: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("gameRoom", gameRoomSchema);
