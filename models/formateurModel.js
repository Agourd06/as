const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const formateur = sequelize.define('formateur', {

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
    specialite: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    
}, {
    tableName: 'formateur',
    timestamps: false
});


module.exports = formateur;
