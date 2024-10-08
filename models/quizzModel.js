const db = require("../config/database");

const QuizzModel = {

    createQuizz: async (quizzData, formateurId) => {

        const {
            contest,
            startingDate,
            trys,
            score,
            
        } = quizzData;


        const insertIntoQuizz = `
  INSERT INTO quizz (contest, startingdate, tentative, score, formateur_id)
  VALUES (?, ?, ?, ?, ?)
`;
        return new Promise((resolve, reject) => {
            db.query(
                insertIntoQuizz,
                [contest, startingDate, trys, score, formateurId],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result.insertId);
                }
            );
        });

    },
    getTeacherQuizz: async(formateurId) => {
            return new Promise((resolve, reject) => {
              const getQuizzs = `SELECT * FROM quizz WHERE formateur_id = (?)`
              db.query(getQuizzs, [formateurId], (err, results) => {
                if (err) {
                  return reject(err);
                }
                resolve(results);
              });
            });
          
    }

}


module.exports = QuizzModel;