const express = require('express');
const router = express.Router();
const UserController = require('../controllers/Users.Controller');
const authJwt = require("../middleware/authJwt")
const uploadImg = require('../middleware/fileupload')


// Define a route for user registration
router.post('/register',UserController.registerUser);
router.post('/login', UserController.login);
router.patch('/user', [authJwt.verifyToken],UserController.updateUserProfile);
router.get('/user', [authJwt.verifyToken],UserController.getUserProfileById);
router.patch('/user-address', [authJwt.verifyToken],UserController.updateUserAdderess);
router.get('/read-file',UserController.readFile);

module.exports = router;