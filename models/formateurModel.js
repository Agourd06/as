const db = require("../config/database");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const FormateurModel = {

  createFormateur: async (formateurData) => {
    const {
      name,
      prenom,
      birth,
      adress,
      specialite,
      email,
      password
    } = formateurData;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insertFormateurQuery = `
      INSERT INTO formateur (name, prenom, birth, adress, specialite, email, password)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
      db.query(
        insertFormateurQuery,
        [name, prenom, birth, adress, specialite, email, hashedPassword],
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
    const checkEmailQuery = 'SELECT * FROM formateur WHERE email = ?';

    return new Promise((resolve, reject) => {
      db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results.length > 0);
      });
    });
  },

  assignClass: (formateurId) => {
    const formateurClassQuery = `
      INSERT INTO class (formateur_id)
      VALUES (?)
    `;

    return new Promise((resolve, reject) => {
      db.query(formateurClassQuery, [formateurId], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },




    updateFormateur: (id, formateurData) => {
      const {
        name,
        prenom,
        birth,
        adress,
        specialite
      } = formateurData;
  
      const sqlQuery = `
        UPDATE formateur 
        SET name = ?, prenom = ?, birth = ?, adress = ?, specialite = ?
        WHERE id = ?
      `;
  
      return new Promise((resolve, reject) => {
        db.query(
          sqlQuery,
          [name, prenom, birth, adress, specialite, id],
          (err, result) => {
            if (err) {
              return reject(err);
            }
            resolve(result);
          }
        );
      });
    },
  
    getFormateurById: (id) => {
      const sqlQuery = 'SELECT * FROM formateur WHERE id = ?';
  
      return new Promise((resolve, reject) => {
        db.query(sqlQuery, [id], (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results.length > 0 ? results[0] : null);
        });
      });
    }
    ,
    deleteFormateur : (id) => {
        return new Promise((resolve, reject) => {
          const sql = "UPDATE formateur SET deleted_at = NOW() WHERE id = ?";
          db.query(sql, [id], (err, results) => {
            if (err) return reject(err);
            else resolve(results)
          });
        })
      },
     
      
  };
  
module.exports = FormateurModel;
