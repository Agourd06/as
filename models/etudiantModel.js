const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Etudiant = sequelize.define('etudiant', {

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    birth: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    inscriptionDate: {
        type: DataTypes.DATE,
        allowNull: false,
    }
    
}, {
    tableName: 'etudiant',
    timestamps: false
});


module.exports = Etudiant;
