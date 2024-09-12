
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

  getStudents: async () => {
    return new Promise((resolve, reject) => {
      
      connection.query('SELECT * FROM etudiant', (err, results) => {
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

