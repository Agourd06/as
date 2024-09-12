
const Stats = require('../models/statsModel');

exports.getStats = async (req, res) => {
  const formateurId = req.session.userId;
  try {
    const stats = await Stats.getStats(formateurId);
    
    const topics = await Stats.getTopics();
    const students = await Stats.getStudents(formateurId);
    res.render('formateur/stats', { stats, students , topics});

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).send('Error fetching stats');
  }
};


