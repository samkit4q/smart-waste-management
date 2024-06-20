const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

// Define the RecyclingEffort model
const RecyclingEffort = sequelize.define('RecyclingEffort', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amountRecycled: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  recyclingDate: {
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
RecyclingEffort.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' }); // Many-to-One relationship with User

// Sync the model with the database (create the table if it doesn't exist)
sequelize.sync()
  .then(() => {
    console.log('RecyclingEffort table has been successfully created, if one doesn\'t exist');
  })
  .catch(error => {
    console.error('This error occurred:', error);
  });

module.exports = RecyclingEffort;

