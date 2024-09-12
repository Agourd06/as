require('dotenv').config();
const express = require('express');
const app = express();
const etudiantRoutes = require('./routes/etudiantRoutes.js');
const formateurRoutes = require('./routes/formateurRoutes.js');
const loginRoutes = require('./routes/loginRoutes.js');
const session = require('express-session');
// const statsRoutes = require('./routes/statsRoutes');

app.use(session({
    secret: 'team1', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use('/etudiant', etudiantRoutes);
app.use('/formateur', formateurRoutes);
app.use('/', loginRoutes);

// app.get('/user', (req, res) => {
//     res.render('layout', {
//         title: 'Home Page',
//         body: 'register'
      
//     });
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 
