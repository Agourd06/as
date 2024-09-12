const QuizzModel = require('../models/quizzModel');


exports.createQuizz = async (req, res) => {
    const {
        contest,
        startingDate,
        trys,
        score
    } = req.body;
  
   
 const formateurId = 18;

  
      const quizzCreation = await QuizzModel.createQuizz(req.body,formateurId);
  
  
        
      return res.status(201).json({
        message: "quizz created successfully",
      });
 
  };