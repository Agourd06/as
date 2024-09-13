const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');


router.post('/login', loginController.checkForAccess);
router.post('/logout', loginController.logout);

router.get('/', (req, res) => {
    res.render('login');  
});

module.exports = router;