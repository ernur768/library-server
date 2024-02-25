const {Router} = require('express');
const router = Router();
const booksController = require('../controller/books-controller');
const authUserMiddleware = require('../middleware/auth-user-middleware');
const authAdminMiddleware = require('../middleware/auth-admin-middleware');

router.get('/books/publisher/:publisher', booksController.getBooksByPublisher)
router.get('/books/author/:author', booksController.getBooksByAuthor)
router.get('/books/category/:category', booksController.getBooksByCategory)
router.get('/books/title/:title', booksController.getBooksByTitle)
router.get('/books/id/:id', booksController.getBookById)
router.get('/books/main-page', booksController.getMainPageBooks)
router.post('/books/main-page', authUserMiddleware, authAdminMiddleware, booksController.addMainPageBook)
router.delete('/books/main-page/:id', authUserMiddleware, authAdminMiddleware, booksController.deleteMainPageBook)

module.exports = router;