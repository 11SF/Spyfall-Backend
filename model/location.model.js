const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const locationSchema = new Schema({
    name : {
        type: String,
        required : true,
        unique: true
    },
    roles : [
        {
            name: {
                type : String,
                required: true,
                unique: true
            },
            description: {
                type : String,
                required: false
            }
        }
    ],
    createBy : {
        type : String,
        required: false
    },
})

module.exports = mongoose.model('location',locationSchema)