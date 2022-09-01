class InternalError extends Error {
    constructor(codeLevel, message) {
        super(codeLevel, message);

        this.name = 'Internal Server Error.';
        this.status = codeLevel;
        this.message = message.toString()
    }
}

class InvalidDataError extends Error {
    constructor(codeLevel, message) {
        super(codeLevel, message);

        this.name = 'Request Data invalid.';
        this.status = codeLevel;
        this.message = message.toString()
    }
}

module.exports = { InternalError, InvalidDataError }