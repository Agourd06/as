const StudentModel = require('../models/etudiantModel');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await StudentModel.getAllStudents();

    res.render('formateur/stats', {
      students
    });
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).send('Server Error');
  }
};





exports.createStudent = async (req, res) => {
    const {
        name,
        prenom,
        birth,
        adress,
        inscriptionDate,
        email,
        password
    } = req.body;

    if (!name || !prenom || !birth || !adress || !inscriptionDate || !email || !password) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^[a-zA-Z0-9!@#$%^&*()_+]{6,}$/;

    if (!emailPattern.test(email)) {
        return res.status(400).json({
            error: 'Invalid email format'
        });
    }

    if (!passwordPattern.test(password)) {
        return res.status(400).json({
            error: 'Password must be at least 6 characters long and contain only valid characters'
        });
    }

    const formateurId = req.session.userId;

    if (!formateurId) {
        return res.status(401).json({
            error: 'Unauthorized: No session ID found.'
        });
    }

    try {
        const emailExists = await StudentModel.checkEmailExists(email);
        if (emailExists) {
            return res.status(400).json({
                error: 'Email already exists'
            });
        }

        await StudentModel.createStudent({
            name,
            prenom,
            birth,
            adress,
            inscriptionDate,
            email,
            password
        }, formateurId);
        return res.status(201).json({
            message: 'Student created successfully and added to class'
        });
    } catch (err) {
        console.error('Error creating student:', err.message);
        return res.status(500).json({
            error: 'Server Error',
            details: err.message
        });
    }
};





exports.updateStudent = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        name,
        prenom,
        birth,
        adress,
        inscriptionDate,
        email
    } = req.body;

    if (!name || !prenom || !birth || !adress || !inscriptionDate) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    try {
        const result = await StudentModel.updateStudent({
            name,
            prenom,
            birth,
            adress,
            inscriptionDate,
            email
        }, id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Student not found'
            });
        }

        res.status(200).json({
            message: 'Student updated successfully',
            id,
            name,
            prenom,
            birth,
            adress,
            inscriptionDate
        });
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).json({
            error: 'Server Error',
            details: err.message
        });
    }
};

exports.deleteStudent = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const result = await StudentModel.deleteStudent(id);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ 
          success: false, 
          message: 'Student not found' 
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Deleted successfully',
        result: result
      });
    } catch (error) {
      console.error('Error in controller:', error.message);
      next(new ApiError(`Error: ${error.message}`, 500));
    }
  };