const ApiError = require('../exeptions/api-error')
const UserModel = require('../model/user-model')
const UserDto = require('../dto/user-dto');

class UserService {
    async getUser(id) {
        const user = await UserModel.findById(id);

        if (!user) {
            throw ApiError.BadRequest('User not found');
        }

        return new UserDto(user)
    }

    async addBook(userId, newBook) {
        // const {id, title, subtitle, authors, publisher, description, pageCount, categories, thumbnail, listType} = book

        const user = await UserModel.findById(userId)
        if (!user) {
            throw ApiError.BadRequest('User not found');
        }

        let bookExists = false

        for (const book of user.books) {
            if (newBook.id === book.id) {
                book.listType = newBook.listType
                bookExists = true
                break
            }
        }

        if (!bookExists) {
            user.books.push(newBook);
        }

        user.listTypes.addToSet(newBook.listType)

        await user.save();

        return new UserDto(user)
    }

    async deleteBook(userId, bookId) {
        return UserModel.updateOne(
            {_id: userId},
            {
                $pull: {books: {id: bookId}}
            }
        )
    }

    async addList(userId, list) {
        const user = await UserModel.findById(userId)

        if (!user) {
            throw ApiError.BadRequest('User not found');
        }

        user.listTypes.push(list)
        await user.save();

        return new UserDto(user)
    }
}

module.exports = new UserService()