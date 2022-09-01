const gameRoomRepo = require("../model/gameRoom.model")
const { InternalError } = require("../utility/error")

async function find(filter) {
    let result
    try {        
        result = await gameRoomRepo.find(filter)
    } catch (err) {
        return new InternalError(5030, err)
    }
    return result
}

async function create(roomObject) {
    let result
    try {
        const newRecord = new gameRoomRepo(roomObject.model)
        result = await newRecord.save()
    } catch (err) {
        return new InternalError(5030, err)
    }
    return result
}

module.exports = { find, create }