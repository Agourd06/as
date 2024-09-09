const db = require('../config/database');

    exports.getAllFormateurs = (req, res) => {
        const sqlQuery = 'SELECT * FROM formateur WHERE deleted_at IS NULL';
        db.query(sqlQuery, (err, results) => {
            if (err) {
                console.error('Error fetching users:', err);
                res.status(500).send('Server Error');
            } else {
                res.render('index', { users: results });
            }
        });
    };



    exports.createFormateur = (req, res) => {
        const { name, prenom,birth,adress,specialite } = req.body;
    

        const sqlQuery = 'INSERT INTO formateur (name, prenom,birth,adress,specialite) VALUES (?, ?, ?, ?, ?)';
        db.query(sqlQuery, [name, prenom,birth,adress,specialite], (err, result) => {
            if (err) {
                console.error('Error creating user:', err);
                return res.status(500).json({ error: 'Server Error', details: err.message });
            }
            res.status(201).json({name, prenom,birth,adress,specialite });
        });
    };

    exports.updateFormateur = (req, res) => {
        const { id } = req.params; 
        const { name, prenom, birth, adress, specialite } = req.body;
    
        const sqlQuery = `
            UPDATE formateur 
            SET name = ?, prenom = ?, birth = ?, adress = ?, specialite = ?
            WHERE id = ?
        `;
        
        db.query(sqlQuery, [name, prenom, birth, adress, specialite, id], (err, result) => {
            if (err) {
                console.error('Error updating Formateur:', err);
                return res.status(500).json({ error: 'Server Error', details: err.message });
            }
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Formateur not found' });
            }
    
            res.status(200).json({ message: 'Formateur updated successfully', id, name, prenom, birth, adress, specialite });
        });
    };


    exports.deleteFormateur = (req, res) => {
        const { id } = req.params;
    
        const sqlQuery = 'UPDATE formateur SET deleted_at = NOW() WHERE id = ?';
    
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
    
    
    
    

