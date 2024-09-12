
const connection = require('../config/database');

const Stats = {
  getStats: async () => {
    return new Promise((resolve, reject) => {
     
      connection.query('SELECT COUNT(*) as count FROM etudiant', (err, results) => {
        if (err) {
          return reject(err);
        }

        resolve({
          etudiants: results[0].count, 
          
        });
      });
    });
  },

  getStudents: async (formateurId) => {
    return new Promise((resolve, reject) => {
      const getStudents = `SELECT * FROM etudiant JOIN class ON class.id = etudiant.class_id JOIN formateur ON formateur.id = class.formateur_id WHERE formateur.id = (?)`
      connection.query(getStudents,formateurId, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results); 
      });
    });
  }
};


module.exports = Stats;

