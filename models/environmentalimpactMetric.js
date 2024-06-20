// models/environmentalImpactMetric.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

// Define the EnvironmentalImpactMetric model
const EnvironmentalImpactMetric = sequelize.define('EnvironmentalImpactMetric', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  metricType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  metricDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  underscored: true, // Uses snake_case for automatically added fields (e.g., created_at)
  freezeTableName: true // Prevents Sequelize from pluralizing table names
});

// Establish relationships
EnvironmentalImpactMetric.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' }); // Many-to-One relationship with User

// Sync the model with the database (create the table if it doesn't exist)
sequelize.sync()
  .then(() => {
    console.log('EnvironmentalImpactMetric table has been successfully created, if one doesn\'t exist');
  })
  .catch(error => {
    console.error('This error occurred:', error);
  });

module.exports = EnvironmentalImpactMetric;

