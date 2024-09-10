require('dotenv').config();
const express = require('express');
const app = express();
const etudiantRoutes = require('./routes/etudiantRoutes.js');
const formateurRoutes = require('./routes/formateurRoutes.js');
const loginRoutes = require('./routes/loginRoutes.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use('/etudiant', etudiantRoutes);
app.use('/formateur', formateurRoutes);
app.use('/', loginRoutes);


const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
