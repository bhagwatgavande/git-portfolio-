const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/Categories.Controller');
const authJwt = require("../middleware/authJwt")

// Define a route for admin//
router.post('/category',[authJwt.verifyToken],[authJwt.isAdmin],CategoriesController.addCategory);
router.get('/category', [authJwt.verifyToken],CategoriesController.getAllCategories);
//router.patch('/category', [authJwt.verifyToken],CategoriesController.updateUserAdderess);

module.exports = router;