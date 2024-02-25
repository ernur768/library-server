const MainPageBookModel = require('../model/main-page-book-model');
const googleBooksApiService = require('./google-books-api-service')
const ApiError = require('../exeptions/api-error');

class MainPageBooksService {
    async getAll() {
        return MainPageBookModel.find()
    }

    async addBook(id) {
        const book = await googleBooksApiService.getBookById(id)

        if (!book) {
            throw ApiError.BadRequest('Книга не найдена');
        }

        // TODO: duplicate key error collection. добавление книг который уже существуют

        return MainPageBookModel.create(book)
    }

    async deleteBook(id) {
        return MainPageBookModel.deleteOne({id})
    }
}

module.exports = new MainPageBooksService()