const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const playerSchema = new Schema({
    name : {
        type: String,
        required : true,
    },
    socketId : {
        type: String,
        required : true,
    }
})

module.exports = mongoose.model('player', playerSchema)