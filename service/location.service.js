const repository = require("../repository/location.repository")
const { InternalError } = require("../utility/error")

async function find(query) {
    let result
    let filter = null
    try {
        if(query.name) {
            filter = {
                name: query.name
            }
        }
        result = await repository.find(filter)
    } catch (err) {
        return new InternalError(5020, err)
    }
    return result
}


async function create(reqData) {
    let result
    try {
        result = await repository.create(reqData)
    } catch (err) {
        return new InternalError(5020, err)
    }
    return result
}

module.exports = { find, create }