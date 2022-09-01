function buildResponse( data ) {
    if(data instanceof Error) {
        return {
            code: data.status,
            message: "Internal Server Error",
            error: data.message,
            data: null
        }
    }
    return {
        code: 1000,
        message: "successful",
        error: null,
        data: data
    }
}
module.exports = { buildResponse }