const FormateurModel = require('../models/formateurModel');



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



exports.createFormateur = async (req, res) => {
  const {
    name,
    prenom,
    birth,
    adress,
    specialite,
    email,
    password
  } = req.body;

  if (name  == ''|| prenom == '' || birth == '' || adress =='' || specialite  == ''|| email =='' || password =='') {



    return res.status(400).json({
      error: "All fields are required",
    });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({
      error: "Invalid email format",
    });
  }

  const passwordPattern = /^[a-zA-Z0-9!@#$%^&*()_+]{6,}$/;
  if (!passwordPattern.test(password)) {
    return res.status(400).json({
      error: "Password must be at least 6 characters long and contain only valid characters",
    });
  }

  try {
    const emailExists = await FormateurModel.checkEmailExists(email);
    if (emailExists) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    const formateurId = await FormateurModel.createFormateur(req.body);


    



    await FormateurModel.assignClass(formateurId);

    const message = encodeURIComponent('Account Created Successfully!');
    res.redirect(`/?message=${message}`);
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({
      error: "Server Error",
      details: err.message,
    });
  }
};



exports.updateFormateur = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    name,
    prenom,
    birth,
    adress,
    specialite
  } = req.body;

  try {
    const formateur = await FormateurModel.getFormateurById(id);
    if (!formateur) {
      return res.status(404).json({
        error: "Formateur not found",
      });
    }


    const result = await FormateurModel.updateFormateur(id, {
      name,
      prenom,
      birth,
      adress,
      specialite
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Formateur not found",
      });
    }

    return res.status(200).json({
      message: "Formateur updated successfully",
      id,
      name,
      prenom,
      birth,
      adress,
      specialite,
    });

  } catch (err) {
    console.error("Error updating Formateur:", err);
    return res.status(500).json({
      error: "Server Error",
      details: err.message,
    });
  }

};


exports.deleteFormateur = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    const result = await FormateurModel.deleteFormateur(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Formateur not found",
      });
    }

    res.status(200).json({
      message: "Formateur soft deleted successfully",
      id,
    });
  } catch (err) {
    console.error("Error soft deleting formateur:", err);
    res.status(500).json({
      error: "Server Error",
      details: err.message,
    });
  }
};

exports.getStudents = async (req, res) => {
  const formateurId = req.session.userId;
  try {
    
    const students = await FormateurModel.getStudents(1);
    res.render('formateur/studentsManage', { students });

  } catch (error) {
    console.error('Error fetching students:', error);
    res.redirect('/');
  }
};