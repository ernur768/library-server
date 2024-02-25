const {Router} = require('express');
const router = Router();

const authController = require('../controller/auth-controller');

router.post('/auth/register', authController.register)
router.get('/auth/activate/:link', authController.activate)
router.post('/auth/login', authController.login)
router.post('/auth/logout', authController.logout)
router.get('/auth/refresh', authController.refresh)

module.exports = router;