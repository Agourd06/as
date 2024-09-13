const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');


router.post('/login', loginController.checkForAccess);
router.get('/logout', loginController.logout);

router.get('/', (req, res) => {
    const message = req.query.message;

    res.render('login' , {message});  
});

router.get('/register', (req, res) => {
    res.render('register');  
});

module.exports = router;