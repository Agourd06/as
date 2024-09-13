const db = require("../config/database");

const QuestionModel = {
    insertQuestion: (contest, subject, media, quizzId) => {
        const insertQuestionQuery = `
            INSERT INTO question (contest, subject_id,media,quizz_id)
            VALUES (?, ?, ?, ?)
        `;

        return new Promise((resolve, reject) => {
            db.query(insertQuestionQuery, [contest, subject, media, quizzId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.insertId);
            });
        });
    },

    createLevel: (name, score, questionId) => {
        const scoreRanges = {
            facile: {
                min: 0,
                max: 30
            },
            moyenne: {
                min: 31,
                max: 70
            },
            difficile: {
                min: 71,
                max: 100
            }
        };

        if (!scoreRanges[name]) {
            return Promise.reject(new Error("Invalid level name provided."));
        }

        const {
            min,
            max
        } = scoreRanges[name];
        if (score < min || score > max) {
            return Promise.reject(new Error(`Score must be between ${min} and ${max} for the ${name} level.`));
        }

        const levelQuery = `INSERT INTO niveau (name, score, question_id) VALUES (?, ?, ?)`;

        return new Promise((resolve, reject) => {
            db.query(levelQuery, [name, score, questionId], (err, result) => {
                if (err) {
                    console.error("Error in createLevel model:", err);
                    return reject(new Error("Server error, could not create level."));
                }
                resolve(result);
            });
        });
    },



    insertAnswers: (questionId, answers) => {
        const insertAnswerQuery = `
            INSERT INTO reponse (question_id, contest, iscorrect)
            VALUES (?, ?, ?)
        `;

        return Promise.all(answers.map(answer => {
            return new Promise((resolve, reject) => {
                db.query(insertAnswerQuery, [questionId, answer.answer, answer.isCorrect ? 1 : 0], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });
        }));
    }
};

module.exports = QuestionModel;