function buildResponse(data) {
    if (data instanceof Error) {
        return {
            meta: {
                code: data.status,
                error: data.name,
                message: data.message,
            },
            data: null
        }
    }
    return {
        meta: {
            code: 1000,
            error: null,
            message: "successful",
        },
        data: data
    }
}
module.exports = { buildResponse }