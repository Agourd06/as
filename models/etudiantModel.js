const db = require('../config/database');
const bcrypt = require('bcrypt');
const saltRounds = bcrypt.genSaltSync(10);

const StudentModel = {

    getAllStudents: async () => {
        const results = 'walo';
        return results;
    },
    createStudent: async (studentData, formateurId) => {
        const {
            name,
            prenom,
            birth,
            adress,
            inscriptionDate,
            email,
            password
        } = studentData;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const classResult = await StudentModel.getClassId(formateurId);

        if (classResult.length === 0) {
            throw new Error('Class not found for the given formateur.');
        }

        const classId = classResult[0].id;

        const insertStudentQuery = `
          INSERT INTO etudiant (name, prenom, birth, adress, inscriptionDate, email, password, class_id)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        return new Promise((resolve, reject) => {
            db.query(
                insertStudentQuery,
                [name, prenom, birth, adress, inscriptionDate, email, hashedPassword, classId],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result.insertId);
                }
            );
        });
    },

    checkEmailExists: (email) => {
        const checkEmailQuery = 'SELECT * FROM etudiant WHERE email = ?';

        return new Promise((resolve, reject) => {
            db.query(checkEmailQuery, [email], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.length > 0);
            });
        });
    },

    getClassId: (formateurId) => {
        const getClassIdQuery = 'SELECT id FROM class WHERE formateur_id = ?';
        return new Promise((resolve, reject) => {
            db.query(getClassIdQuery, [formateurId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    updateStudent: (studentData, id) => {
        const {
            name,
            prenom,
            birth,
            adress,
            inscriptionDate,
            email
        } = studentData;
        const sqlQuery = `
          UPDATE etudiant
          SET name = ?, prenom = ?, birth = ?, adress = ?, inscriptionDate = ? , email = ? 
          WHERE id = ?
        `;
        return new Promise((resolve, reject) => {
            db.query(sqlQuery, [name, prenom, birth, adress, inscriptionDate,email, id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    deleteStudent: (id) => {
        return new Promise((resolve, reject) => {
          const sql = "UPDATE etudiant SET deleted_at = NOW() WHERE id = ?";
          db.query(sql, [id], (err, results) => {
            if (err) {
              return reject(err);
            }
            resolve(results);
          });
        });
      }
    //   getAllStudents: () => {
    //     const sqlQuery = 'SELECT * FROM etudiant WHERE deleted_at IS NULL';
    //     return new Promise((resolve, reject) => {
    //       db.query(sqlQuery, (err, results) => {
    //         if (err) {
    //           return reject(err);
    //         }
    //         resolve(results);
    //       });
    //     });
    //   }

};

module.exports = StudentModel;