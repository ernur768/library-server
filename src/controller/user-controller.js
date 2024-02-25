const userService = require('../service/user-service');

class UserController {
    async me(req, res, next) {
        try {
            const userId = req.userId
            const user = await userService.getUser(userId)

            res.json(user)
        }
        catch (error) {
            next(error);
        }
    }

    async addBook(req, res, next) {
        try {
            const userId = req.userId
            const {book} = req.body
            const user = await userService.addBook(userId, book)

            res.json(user)
        }
        catch (error) {
            next(error);
        }
    }

    async deleteBook(req, res, next) {
        try {
            const userId = req.userId
            const {id} = req.params
            const user = await userService.deleteBook(userId, id)

            res.json(user)
        }
        catch (error) {
            next(error);
        }
    }

    async addList(req, res, next) {
        try {
            const userId = req.userId
            const {list} = req.body
            const user = await userService.addList(userId, list)

            res.json(user)
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController()