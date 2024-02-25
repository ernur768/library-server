const {Router} = require('express');
const router = Router();

const authRouter = require('./auth-router');
const userRouter = require('./user-router');
const booksRouter = require('./books-router');

router.use('/', authRouter);
router.use('/', userRouter);
router.use('/', booksRouter);

module.exports = router;