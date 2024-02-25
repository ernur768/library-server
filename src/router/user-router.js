const { Router } = require('express');
const router = Router();
const authUserMiddleware = require('../middleware/auth-user-middleware');
const userController = require('../controller/user-controller');

router.get('/user', authUserMiddleware, userController.me)
router.post('/user/books', authUserMiddleware, userController.addBook)
router.delete('/user/books/:id', authUserMiddleware, userController.deleteBook)
router.post('/user/lists', authUserMiddleware, userController.addList)

module.exports = router;