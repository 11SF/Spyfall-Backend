const { InvalidDataError } = require("../utility/error")

function mapRequestBodyLocationToModelObject(reqData) {

    const { _id, name, roles, createBy } = reqData
    if (!name) {
        throw new InvalidDataError(5011, "Invalid data: field 'name' is require <name is a key>")
    }
    return {
        "id": (_id ? _id : null),
        model: {
            "name": name,
            "roles": mapRoles(roles),
            "createBy": (createBy ? createBy : "anonymous"),
        }
    }
}

function mapRoles(roles) {
    let rolesResult = []
    for (const index in roles) {
        rolesResult.push({
            name: roles[index].name,
            description: (roles[index].description ? roles[index].description : "")
        })
    }
    return rolesResult
}

module.exports = { mapRequestBodyLocationToModelObject }