function mapRequestBodyLocationToModel(reqData) {
    return {
        "name" : reqData.name,
        "roles" : mapRoles(reqData.roles),
        "createBy" : (reqData.createBy ? reqData.createBy : "anonymous"),
    }
}

function mapRoles(roles) {
    let rolesResult = []
    for (const index in roles) {
        rolesResult.push({
            name: roles[index].name,
            description: (roles[index].description ? roles[index].description : "" )
        })
    }
    return rolesResult
}

module.exports = { mapRequestBodyLocationToModel }