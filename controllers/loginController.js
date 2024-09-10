const db = require('../config/database');
const bcrypt = require('bcrypt');

exports.checkForAccess = async (req, res) => {
    const { email, password } = req.body;

    const checkFormateurQuery = 'SELECT id, email, password FROM formateur WHERE email = ?';
    const checkEtudiantQuery = 'SELECT id, email, password FROM etudiant WHERE email = ?';

    db.query(checkFormateurQuery, [email], async(err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({
                error: 'Server Error',
                details: err.message
            });
        }

        if (result.length > 0) {
            const user = result[0];
   
            req.session.userId = user.id;
            req.session.userRole = 'formateur';
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    console.error('error in comparison', err);
                    return res.status(500).json({
                        error: 'Server Error',
                        details: err.message
                    });
                }

                if (match) {
                    return res.status(200).json({
                        message: 'Formateur exists',
                        user: {
                            id: user.id,
                            role: 'formateur',
                        }
                    });
                } else {
                    return res.status(401).json({
                        message: 'Invalid password'
                    });
                }
            });
        } else {
            db.query(checkEtudiantQuery,  [email],async (err, result) => {
                if (err) {
                    console.error('Database query error:', err);
                    return res.status(500).json({
                        error: 'Server Error',
                        details: err.message
                    });
                }

                if (result.length > 0) {
                    const user = result[0];
                    req.session.userId = user.id;
                    req.session.userRole = 'etudiant';

        if((await bcrypt.compare(password, user.password))){
            console.log('is false')
        }
                    bcrypt.compare(password, user.password, (err, match) => {
                        if (err) {
                            console.error('Password comparison error:', err);
                            return res.status(500).json({
                                error: 'Server Error',
                                details: err.message
                            });
                        }
                        if (match) {
                            return res.status(200).json({
                                message: 'Etudiant exists',
                                user: {
                                    id: user.id,
                                    role: 'etudiant',
                                }
                            });
                        } else {
                            return res.status(401).json({
                                message:'mot de pass ghalat'
                            });
                        }
                    });
                } else {
                    return res.status(404).json({
                        message: 'User not found'
                    });
                }
            });
        }
    });
};
