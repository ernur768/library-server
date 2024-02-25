class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User unauthorized')
    }

    static ServerError() {
        return new ApiError(500, 'Internal Server Error');
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static ForbiddenError() {
        return new ApiError(403, 'Forbidden');
    }

}

module.exports = ApiError;