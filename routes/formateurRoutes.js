const express = require('express');
const router = express.Router();
const formateurController = require('../controllers/formateurController');
const etudiantController = require('../controllers/etudiantController');
const checkRole = require('../middleware/checkRole');

router.get('/', checkRole('formateur'), formateurController.getAllFormateurs);

router.get('/home', checkRole('formateur'), (req, res) => {
    res.render('formateur/formateur');
});


// ------------------------student CRUD------------------------
router.post('/createStd', checkRole('formateur'), etudiantController.createStudent);
router.put('/updateStd/:id', checkRole('formateur'), etudiantController.updateStudent);
router.put('/deleteStd/:id', checkRole('formateur'), etudiantController.deleteStudent);
// ------------------------student CRUD------------------------



// ------------------------formateur CRUD------------------------
router.post('/createFormateur', checkRole('formateur'), formateurController.createFormateur);
router.put('/updateFormateur/:id', checkRole('formateur'), formateurController.updateFormateur);
router.put('/deleteFormateur/:id', checkRole('formateur'), formateurController.deleteFormateur);
// ------------------------formateur CRUD------------------------


module.exports = router;