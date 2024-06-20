# Waste Management System

## Project Description

A web application to manage waste collection schedules and recycling efforts. Users can register, log in, and access a dashboard to manage their activities.

## Features

- User Registration and Login
- Dashboard for managing waste collection schedules
- Tracking of recycling efforts
- Secure session management

## Technologies Used

- Node.js
- Express
- Sequelize
- MySQL
- bcrypt
- express-session

## Setup Instructions

### Prerequisites

- Node.js and npm
- MySQL

### Install Dependencies

npm install

Configure the Database
Create a MySQL database.
Update config/database.js with your database details:

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
Replace database_name, username, and password with your MySQL database details.

Generate a Secret Key
Generate a secret key for session management:

node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"

Create a .env File
Create a .env file with the following content:

PORT=3000
SECRET_KEY=your_generated_secret_key
Replace your_generated_secret_key with the secret key you generated.

Run Database Migrations

npx sequelize-cli db:migrate
Start the Server

npm start
Visit http://localhost:3000.

Project Structure

├── config/
│   └── database.js
├── models/
│   ├── user.js
│   ├── wasteCollectionSchedule.js
│   └── recyclingEffort.js
├── public/
│   ├── register.html
│   ├── login.html
│   ├── dashboard.html
│   ├── schedule.html
│   ├── recycling.html
│   └── impact.html
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js