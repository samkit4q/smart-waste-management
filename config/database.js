// config/database.js

require('dotenv').config(); // Load environment variables from .env file
const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development'; // Set environment to 'development' by default
const dbConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
};

// Initialize Sequelize with database credentials
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false // Disable logging (you can enable if needed for debugging)
});

module.exports = sequelize;
