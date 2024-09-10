const db = require("../config/database");


exports.createSubject = async (req, res) => {

    const {
        title
    } = req.body

    const subjectQuery = `INSERT INTO sujet (title) VALUES  (?)`

    db.query(subjectQuery, [title], (err, result) => {
        if (err) {
            console.error('Database insert error:', err);
            return res.status(500).json({
                error: 'Server Error',
                details: err.message
            });
        }
        return res.status(201).json({
            message: 'subject created successfully',

        });
    })
}


exports.createSubSubject = async (req, res) => {

    const {
        title,
        sujetId
    } = req.body

    const subjectQuery = `INSERT INTO sujet (title,sujet_id) VALUES  (?, ?)`

    db.query(subjectQuery, [title, sujetId], (err, result) => {
        if (err) {
            console.error('Database insert error:', err);
            return res.status(500).json({
                error: 'Server Error',
                details: err.message
            });
        }
        return res.status(201).json({
            message: 'Subsubject created successfully',

        });
    })
}


exports.updateSubjects = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        title
    } = req.body;

    const subjectUpdateQuery = `UPDATE sujet SET title = ? WHERE id = ?`
    db.query(subjectUpdateQuery, [title, id], (err, result) => {
        if (err) {
            console.error('Error updating subject:', err);
            return res.status(500).json({
                error: 'Server Error',
                details: err.message
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'subject not found'
            });
        }
        res.status(200).json({
            message: 'subject updated successfully',
            id,
            title,

        });
    })

}
exports.deleteSubjects = async (req, res) => {
    
    const {
        id
    } = req.params;

    const subjectUpdateQuery = `UPDATE sujet SET deleted_at = NOW() WHERE id = ?`
    db.query(subjectUpdateQuery, [id], (err, result) => {
        if (err) {
            console.error('Error updating subject:', err);
            return res.status(500).json({
                error: 'Server Error',
                details: err.message
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'subject not found'
            });
        }
        res.status(200).json({
            message: 'subject deleted successfully',
            id
           

        });
    })

}