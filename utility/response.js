function buildResponse(data) {
    if (data instanceof Error) {
        return {
            meta: {
                code: data.status,
                message: data.name,
                error: data.message,
            },
            data: null
        }
    }
    return {
        meta: {
            code: 1000,
            message: "successful",
            error: null
        },
        data: data
    }
}
module.exports = { buildResponse }