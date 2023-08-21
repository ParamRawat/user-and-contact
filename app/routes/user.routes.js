const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();

router.post('/register', UserController.register);
router.get('/all-users', UserController.getAllUsers);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/forgot-password', UserController.forgotPassword)
router.post('/reset-password', UserController.resetPassword);
router.put('/change-password', UserController.changePassword);

module.exports = router;
