const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET request to fetch all users
router.get('/', userController.getAllUsers);

// POST request to create a new user
router.post('/', userController.createUser);

module.exports = router;
