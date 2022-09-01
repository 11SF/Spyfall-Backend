const gameRoomReposotory = require("../repository/gameRoom.repository")
const { InternalError } = require("../utility/error")

async function find(query) {
    let result
    let filter = null
    try {
        if(query.code) {
            filter = {
                code: query.code
            }
        }
        result = await gameRoomReposotory.find(filter)
    } catch (err) {
        return new InternalError(5020, err)
    }
    return result
}

async function create(roomObject) {
    let result
    roomObject.model.code = randomToken(6)
    try {
        result = await gameRoomReposotory.create(roomObject)
    } catch (err) {
        return new InternalError(5020, err)
    }
    return result
}

function randomToken(length) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

module.exports = { find, create }