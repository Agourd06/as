const db = require('../config/database');

    exports.getAllStudents = (req, res) => {
        const sqlQuery = 'SELECT * FROM etudiant WHERE deleted_at IS NULL';
        db.query(sqlQuery, (err, results) => {
            if (err) {
                console.error('Error fetching users:', err);
                res.status(500).send('Server Error');
            } else {
                res.render('index', { users: results });
            }
        });
    };



    exports.createStudent = (req, res) => {
        const { name, prenom,birth,adress,inscriptionDate } = req.body;
    

        const sqlQuery = 'INSERT INTO etudiant (name, prenom,birth,adress,inscriptionDate) VALUES (?, ?, ?, ?, ?)';
        db.query(sqlQuery, [name, prenom,birth,adress,inscriptionDate], (err, result) => {
            if (err) {
                console.error('Error creating user:', err);
                return res.status(500).json({ error: 'Server Error', details: err.message });
            }
            res.status(201).json({name, prenom,birth,adress,inscriptionDate });
        });
    };

    exports.updateStudent = (req, res) => {
        const { id } = req.params; 
        const { name, prenom, birth, adress, inscriptionDate } = req.body;
    
        const sqlQuery = `
            UPDATE etudiant 
            SET name = ?, prenom = ?, birth = ?, adress = ?, inscriptionDate = ?
            WHERE id = ?
        `;
        
        db.query(sqlQuery, [name, prenom, birth, adress, inscriptionDate, id], (err, result) => {
            if (err) {
                console.error('Error updating student:', err);
                return res.status(500).json({ error: 'Server Error', details: err.message });
            }
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }
    
            res.status(200).json({ message: 'Student updated successfully', id, name, prenom, birth, adress, inscriptionDate });
        });
    };


    exports.deleteStudent = (req, res) => {
        const { id } = req.params;
    
        const sqlQuery = 'UPDATE etudiant SET deleted_at = NOW() WHERE id = ?';
    
        db.query(sqlQuery, [id], (err, result) => {
            if (err) {
                console.error('Error soft deleting student:', err);
                return res.status(500).json({ error: 'Server Error', details: err.message });
            }
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }
    
            res.status(200).json({ message: 'Student soft deleted successfully', id });
        });
    };
    
    
    
    

