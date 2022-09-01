function mapRequestBodyRoomToModelObject(reqData) {

    const { _id, code, name, ownerId, roundTime } = reqData
    return {
        "id": (_id ? _id : null),
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