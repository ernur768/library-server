const ApiError = require('../exeptions/api-error')
const UserModel = require('../model/user-model')

const authAdminMiddleware = async (req, res, next) => {
    try {
        const userId = req.userId

        if (!userId) {
            next(ApiError.UnauthorizedError())
        }

        const user = await UserModel.findById(userId)
        if (user.role !== 'admin') {
            next(ApiError.ForbiddenError())
        }

        return next()
    }
    catch (error) {
        next(error)
    }
}

module.exports = authAdminMiddleware