// models/user.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('household', 'waste_service', 'admin'),
    defaultValue: 'admin'
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  underscored: true, // Uses snake_case for automatically added fields (e.g., created_at)
  freezeTableName: true // Prevents Sequelize from pluralizing table names
});

// Sync the model with the database (create the table if it doesn't exist)
sequelize.sync()
  .then(() => {
    console.log('User table has been successfully created, if one doesn\'t exist');
  })
  .catch(error => {
    console.error('This error occurred:', error);
  });

module.exports = User;

