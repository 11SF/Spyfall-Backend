const locationRepo = require('../Model/location.model')
const { InternalError } = require('../utility/error')

async function find(filter) {
    let result
    try {
        result = await locationRepo.find(filter)
    } catch (err) {
        return new InternalError(5030, err)
    }
    return result
}

async function create(locationObject) {
    let result
    try {
        const newRecord = new locationRepo(locationObject.model)
        result = await newRecord.save()
    } catch (err) {
        return new InternalError(5030, err)
    }
    return result
}

async function update(locationObject) {
    let result
    try {
        result = await locationRepo.findByIdAndUpdate(locationObject.id, { roles: locationObject.model.roles })
    } catch (err) {
        return new InternalError(5030, err)
    }
    return result
}


module.exports = { find, create, update }