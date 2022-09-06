function mapRequestBodyRoomToModelObject(reqData) {

    const { id, code, name, ownerId, roundTime } = reqData
    return {
        "id": (id ? id : null),
        model: {
            name: (name ? name: null),
            code: (code ? code : null),
            ownerId: (ownerId ? ownerId : null),
            players:[
                {
                    id: (ownerId ? ownerId : null)
                }
            ],
            roundTime: (roundTime ? roundTime : null),
        }
    }
}

module.exports = { mapRequestBodyRoomToModelObject }