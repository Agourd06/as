
const Stats = require('../models/statsModel');

const getStats = async (req, res) => {
  try {
    const stats = await Stats.getStats();
    res.render('formateur/stats', { stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).send('Error fetching stats');
  }
};

module.exports = {
  getStats,
};
