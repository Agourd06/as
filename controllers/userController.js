const db = require('../config/database');

exports.getAllUsers = (req, res) => {
    const sqlQuery = 'SELECT * FROM users';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Server Error');
        } else {
            res.render('index', { users: results });
        }
    });
};

exports.createUser = (req, res) => {
    const { name, age } = req.body;
console.log(req.body)
   

    const sqlQuery = 'INSERT INTO users (name, age) VALUES (?, ?)';
    db.query(sqlQuery, [name, age], (err, result) => {
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ error: 'Server Error', details: err.message });
        }
        res.status(201).json({ name, age });
    });
};

