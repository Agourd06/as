const express = require('express');
const router = express.Router();
const formateurController = require('../controllers/formateurController');
const etudiantController = require('../controllers/etudiantController');
const subjectController = require('../controllers/subjectController');
const levelController = require('../controllers/levelController');
const statsController = require('../controllers/statsController');
const testController = require('..')
const checkRole = require('../middleware/checkRole');

router.get('/studPage',checkRole('formateur'), etudiantController.getAllStudents);

router.get('/home', checkRole('formateur'), (req, res) => {
    res.render('formateur/formateur');
});

router.get('/test', checkRole('formateur'), (req, res) => {
    res.render('formateur/test');
});


// ------------------------student CRUD------------------------
router.post('/createStd', checkRole('formateur'), etudiantController.createStudent);
// router.get('/getstudents', checkRole('formateur'), etudiantController.getAllStudents);
router.put('/updateStd/:id',  etudiantController.updateStudent);
router.put('/deleteStd/:id', checkRole('formateur'), etudiantController.deleteStudent);
// ------------------------student CRUD------------------------




// ------------------------formateur CRUD------------------------
router.post('/createFormateur', formateurController.createFormateur);
router.put('/updateFormateur/:id', checkRole('formateur'), formateurController.updateFormateur);
router.put('/deleteFormateur/:id',  formateurController.deleteFormateur);
// ------------------------formateur CRUD------------------------




// ------------------------subject CRUD------------------------
router.post('/SubjectAdd', checkRole('formateur'), subjectController.createSubject);
router.post('/SubSubjectAdd', checkRole('formateur'), subjectController.createSubSubject);
router.put('/SubjectUpdate/:id',checkRole('formateur'), subjectController.updateSubjects);
router.put('/SubjectDelete/:id', checkRole('formateur'),subjectController.deleteSubjects);
// ------------------------subject CRUD------------------------


// ------------------------Level CRUD------------------------
router.post('/createLevel',  levelController.createLevel);


// ------------------------Level CRUD------------------------




//--------------------------stats--------------------------------

router.get('/stats', statsController.getStats);

//--------------------------test---------------------------

// router.get('/quiz', testController.addtest);


module.exports = router;