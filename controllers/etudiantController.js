const db = require('../config/database');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

exports.getAllStudents = (req, res) => {
    const sqlQuery = 'SELECT * FROM etudiant WHERE deleted_at IS NULL';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error fetching students:', err);
            res.status(500).send('Server Error');
        } else {
            res.render('index', {
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

   
        bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({
                    error: 'Server Error',
                    details: err.message
                });
            }

            const insertStudentQuery = `
            INSERT INTO etudiant (name, prenom, birth, adress, inscriptionDate, email, password)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

            db.query(insertStudentQuery, [name, prenom, birth, adress, inscriptionDate, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Database insert error:', err);
                    return res.status(500).json({
                        error: 'Server Error',
                        details: err.message
                    });
                }

                return res.status(201).json({
                    message: 'Student created successfully',
                    studentId: result.insertId
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