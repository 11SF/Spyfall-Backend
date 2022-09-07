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

class DataNotFound extends Error {
    constructor(message) {
        super(message);

        this.name = 'Data not found';
        this.status = 1999;
        this.message = message.toString()
    }
}

module.exports = { InternalError, InvalidDataError, DataNotFound }