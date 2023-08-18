// module.exports = app => {
//     const userController = require('../controllers/user.controller')

//     app.route('/user')
//         .post(userController.create)
//         .get(userController.read)

//     app.route('/user/:id')
//         .put(userController.update)
//         .delete(userController.delete)
//         .get(userController.readById)
// }

const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();

router.post('/register', UserController.register);
// router.post('/login', UserController.login);
// router.post('/logout', UserController.logout);
// router.post('/forgot-password', UserController.forgotPassword);
// router.post('/reset-password', UserController.resetPassword);
// router.put('/change-password', UserController.changePassword);
// router.get('/all-users', UserController.getAllUsers);

module.exports = router;
