const googleBooksApiService = require('../service/google-books-api-service');
const mainPageBooksService = require('../service/main-page-books-service')

class BooksController {
    async getBooksByPublisher(req, res, next) {
        try {
            const { publisher } = req.params;
            const { offset } = req.query;
            const books = await googleBooksApiService.getBooksByPublisher(publisher, offset);

            res.json(books)
        }
        catch (error) {
            next(error);
        }
    }

    async getBooksByAuthor(req, res, next) {
        try {
            const { author } = req.params;
            const { offset } = req.query;
            const books = await googleBooksApiService.getBooksByAuthor(author, offset);

            res.json(books)
        }
        catch (error) {
            next(error);
        }
    }

    async getBooksByCategory(req, res, next) {
        try {
            const { category } = req.params;
            const { offset } = req.query;
            const books = await googleBooksApiService.getBooksByCategory(category, offset);

            res.json(books)
        } catch (error) {
            next(error);
        }
    }

    async getBooksByTitle(req, res, next) {
        try {
            const { title } = req.params;
            const { offset } = req.query;
            const books = await googleBooksApiService.getBooksByTitle(title, offset);

            res.json(books)
        } catch (error) {
            next(error);
        }
    }

    async getBookById(req, res, next) {
        try {
            const { id } = req.params;
            const book = await googleBooksApiService.getBookById(id);
            console.log(book.thumbnail)

            res.json(book)
        }
        catch (error) {
            next(error)
        }
    }

    async getMainPageBooks(req, res, next) {
        try {
            const books = await mainPageBooksService.getAll()
            res.json(books)
        }
        catch (error) {
            next(error)
        }
    }

    async addMainPageBook(req, res, next) {
        try {
            const {id} = req.body
            const book = await mainPageBooksService.addBook(id)

            res.json(book)
        }
        catch (error) {
            next(error)
        }
    }

    async deleteMainPageBook(req, res, next) {
        try {
            const {id} = req.params
            const result = await mainPageBooksService.deleteBook(id)

            res.json(result)
        }
        catch (error) {
            next(error)
        }
    }
}

module.exports = new BooksController()