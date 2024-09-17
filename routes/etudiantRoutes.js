const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');
const checkRole = require('../middleware/checkRole');

// router.get('/',checkRole('etudiant'), etudiantController.getAllStudents);

router.get('/home',checkRole('etudiant'), (req, res) => {
    res.render('etudiant/etudiant');  
});

router.get('/quiz', (req, res) => {
    res.render("etudiant/quiz");
});

module.exports = router;