const tokenService = require('../service/token-service')
const ApiError = require('../exeptions/api-error')

const authUserMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(ApiError.UnauthorizedError())
        }

        const authToken = authHeader.split(' ')[1];
        if (!authToken) {
            return next(ApiError.UnauthorizedError())
        }

        const user = tokenService.verifyAccessToken(authToken)
        if (!user) {
            return next(ApiError.UnauthorizedError())
        }

        req.userId = user.id
        return next();
    }
    catch (error) {
        next(error)
    }
}

module.exports = authUserMiddleware;