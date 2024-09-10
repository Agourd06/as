const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');

router.get('/', etudiantController.getAllStudents);

router.get('/home', (req, res) => {
    res.render('etudiant/etudiant');  
});

router.post('/create', etudiantController.createStudent);

router.put('/update/:id', etudiantController.updateStudent);

router.put('/delete/:id', etudiantController.deleteStudent);

module.exports = router;