
const Stats = require('../models/statsModel');

exports.getStats = async (req, res) => {
  try {
    const stats = await Stats.getStats();
    const students = await Stats.getStudents();
    const topics = await Stats.getTopics();
    
    res.render('formateur/stats', { stats, students , topics});
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).send('Error fetching stats');
  }
};


