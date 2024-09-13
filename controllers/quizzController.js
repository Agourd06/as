const QuizzModel = require('../models/quizzModel');

exports.createQuizz = async (req, res) => {
    const {
        contest,
        startingDate,
        trys,
        score
    } = req.body;

    const formateurId = req.session.userId;

    try {
         await QuizzModel.createQuizz(req.body, formateurId);

         return res.redirect('question');
        } catch (error) {
        console.error('Error creating quiz:', error);
        return res.status(500).json({
            message: 'Error creating quiz',
            error: error.message
        });
    }
};

exports.getTeacherQuizz = async (req, res) => {
    try {
        const formateurId = req.session.userId; 
        
        if (!formateurId) {
            return res.status(400).json({ success: false, message: 'Formateur ID not found in session' });
        }

        const Quizzs = await QuizzModel.getTeacherQuizz(formateurId);

        return res.render('formateur/addQuizz', { Quizzs });
    } catch (error) {
        console.error('Error fetching teacher quizzes:', error);

        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch quizzes. Please try again later.',
            });
        }
    }
};

