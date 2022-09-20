const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  roles: [
    {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  createBy: {
    type: String,
    required: false,
  },
  createByPlayerId: {
    type: String,
    required: false,
  },
  createDate: {
    type: Date,
    required: false,
  },
  updateDate: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("location", locationSchema);
