const QuestionModel = require("../models/questionModel");

exports.createQuestion = async (req, res) => {
    const { contest, score, subject ,answersArray } = req.body;

    let answers = [];
    try {
        answers = JSON.parse(answersArray);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Invalid answers format'
        });
    }
    if (contest =='' || score == '' || subject == ''   ) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required and answers must be an array'
        });
    }

    try {
        const questionId = await QuestionModel.insertQuestion(contest, subject);
        console.log(questionId);
        
        await QuestionModel.createLevel('facile', score, questionId);
        await QuestionModel.insertAnswers(questionId, answers);

        return res.status(201).json({
            success: true,
            message: 'Question created successfully'
        });
    } catch (error) {
        console.error('Error in createQuestion controller:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to create question'
        });
    }
};
