const connection = require('../config/database');

const Stats = {
  getStats: async (formateurId) => {
    return new Promise((resolve, reject) => {
      const countStudentsQuery = `
        SELECT COUNT(*) AS student_count
        FROM etudiant
        JOIN class ON class.id = etudiant.class_id
        JOIN formateur ON formateur.id = class.formateur_id
        WHERE formateur.id = ?
      `;

      connection.query(countStudentsQuery, [formateurId], (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          return reject(err);
        }

        resolve({
          etudiants: results[0].student_count
        });
      });
    });
  },
  getStudents: async (formateurId) => {
    return new Promise((resolve, reject) => {
      const getStudents = `SELECT * FROM etudiant JOIN class ON class.id = etudiant.class_id JOIN formateur ON formateur.id = class.formateur_id WHERE formateur.id = (?)`
      connection.query(getStudents, formateurId, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  getTopics: async () => {
    return new Promise((resolve, reject) => {

      connection.query('SELECT COUNT(*) as count FROM sujet', (err, results) => {
        if (err) {
          return reject(err);
        }

        resolve({
          topics: results[0].count,

        });
      });
    });
  }
};


module.exports = Stats;