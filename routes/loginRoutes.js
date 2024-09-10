const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');


router.post('/login', loginController.checkForAccess);

router.get('/log', (req, res) => {
    res.render('login');  
});

module.exports = router;