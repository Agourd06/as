const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');

router.get('/', etudiantController.getAllStudents);

router.post('/create', etudiantController.createStudent);

router.put('/update/:id', etudiantController.updateStudent);

router.put('/delete/:id', etudiantController.deleteStudent);

module.exports = router;