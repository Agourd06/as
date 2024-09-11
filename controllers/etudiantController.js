const db = require('../config/database');
const bcrypt = require('bcrypt');
const saltRounds = bcrypt.genSaltSync(10);

exports.getAllStudents = (req, res) => {
    const sqlQuery = 'SELECT * FROM etudiant WHERE deleted_at IS NULL';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error fetching students:', err);
            res.status(500).send('Server Error');
        } else {
            res.render('formateur/stats', {
                users: results
            });
        }
    });
};




exports.createStudent = (req, res) => {
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
            error: "All fields are required",
        });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^[a-zA-Z0-9!@#$%^&*()_+]{6,}$/;

    // check for email format if is it good
    if (!emailPattern.test(email)) {
        return res.status(400).json({
            error: "Invalid email format",
        });
    }

    // check for password format if is it good

    if (!passwordPattern.test(password)) {
        return res.status(400).json({
            error: "Password must be at least 6 characters long and contain only valid characters",
        });
    }

    const checkEmailQuery = `
      SELECT COUNT(*) AS count FROM etudiant WHERE email = ?
    `;
    const [emailResult] = db.query(checkEmailQuery, [email]);

    if (emailResult[0].count > 0) {
        return res.status(409).json({

            error: "Email already exists",

        });
    }

    const formateurId = req.session.userId;

    if (!formateurId) {
        return res.status(401).json({
            error: 'Unauthorized: No session ID found.'
        });
    }

    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({
                error: 'Server Error',
                details: err.message
            });
        }

        const getClassIdQuery = `'
            SELECT id FROM class WHERE formateur_id = ?
        `;

        db.query(getClassIdQuery, [formateurId], (err, results) => {
            if (err) {
                console.error('Database query error for class ID:', err);
                return res.status(500).json({
                    error: 'Server Error',
                    details: err.message
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    error: 'Class not found for the given formateur.'
                });
            }

            const classId = results[0].id;

            const insertStudentQuery = `
                INSERT INTO etudiant (name, prenom, birth, adress, inscriptionDate, email, password, class_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            db.query(insertStudentQuery, [name, prenom, birth, adress, inscriptionDate, email, hashedPassword, classId], (err, result) => {
                if (err) {
                    console.error('Database insert error:', err);
                    return res.status(500).json({
                        error: 'Server Error',
                        details: err.message
                    });
                }


                return res.status(201).json({
                    message: 'Student created successfully and added to class',

                });
            });
        });
    });
};





exports.updateStudent = (req, res) => {
    const {
        id
    } = req.params;
    const {
        name,
        prenom,
        birth,
        adress,
        inscriptionDate
    } = req.body;

    const sqlQuery = `
            UPDATE etudiant 
            SET name = ?, prenom = ?, birth = ?, adress = ?, inscriptionDate = ?
            WHERE id = ?
        `;

    db.query(sqlQuery, [name, prenom, birth, adress, inscriptionDate, id], (err, result) => {
        if (err) {
            console.error('Error updating student:', err);
            return res.status(500).json({
                error: 'Server Error',
                details: err.message
            });
        }

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
    });
};


exports.deleteStudent = (req, res) => {
    const {
        id
    } = req.params;

    const sqlQuery = 'UPDATE etudiant SET deleted_at = NOW() WHERE id = ?';

    db.query(sqlQuery, [id], (err, result) => {
        if (err) {
            console.error('Error soft deleting student:', err);
            return res.status(500).json({
                error: 'Server Error',
                details: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Student not found'
            });
        }

        res.status(200).json({
            message: 'Student soft deleted successfully',
            id
        });
    });
};