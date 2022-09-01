class InternalError extends Error {
    constructor(codeLevel, message) {
        super(codeLevel, message);

        this.name = 'Internal Server Error';
        this.status = codeLevel;
        this.message = message.toString()
    }
}

module.exports = { InternalError }