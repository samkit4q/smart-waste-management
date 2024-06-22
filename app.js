const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const sequelize = require('./config/database'); // Sequelize instance
const User = require('./models/user');
const WasteCollectionSchedule = require('./models/wasteCollectionSchedule');
const RecyclingEffort = require('./models/recyclingEffort');

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: '49a23569179e985fb1fe7bffeaa8759f19c91ea153a11696f0368eb9ab5940f2',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Registration page route
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/register.html'));
});

// Registration route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate the input
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    await User.create({ username, email, password: hashedPassword });

    // Redirect to login page
    res.redirect('/login');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Login page route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

    // Compare the password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send('Invalid email or password');
    }

    // Create session
    req.session.userId = user.id;

    // Handle successful login
    res.redirect(`/dashboard`);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Middleware to protect routes
function authMiddleware(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

// Dashboard route
app.get('/dashboard', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'public','home.html'));
});

// Waste Schedule route
app.get('/schedule', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/schedule.html'));
});

// Save Waste Collection Schedule route
app.post('/schedule', authMiddleware, async (req, res) => {
  console.log('Request body:', req.body);
  const { collectionDate, scheduleTime, isRecycled } = req.body;
  const userId = req.session.userId;

  try {
    // Save the waste collection schedule to the database
    const schedule = await WasteCollectionSchedule.create({
      userId,
      collectionDate,
      scheduleTime,
      isRecycled
    });
    res.status(201).json({
      success: true,
      message: 'Waste collection schedule saved',
      schedule
    });
  } catch (error) {
    console.error('Error saving waste collection schedule:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
});


// Recycling Effort route
app.get('/recycle', authMiddleware, (req, res) => {
  console.log('Serving recycling page');
  res.sendFile(path.join(__dirname, 'public/recycling.html'));
});

// Save Recycling Effort route
app.post('/recycle', authMiddleware, async (req, res) => {
  console.log('Request body:', req.body);
  const { item, amountRecycled, recyclingDate } = req.body;
  const userId = req.session.userId;

  try {
    // Save the recycling effort to the database
    const recyclingEffort = await RecyclingEffort.create({ userId, item, amountRecycled, recyclingDate });
    res.status(201).json({
      success: true,
      message: 'Recycling effort saved',
      recyclingEffort
    });
  } catch (error) {
    console.error('Error saving recycling effort:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
});

// Impact route
app.get('/impact', authMiddleware, (req, res) => {
  console.log('Serving impact page');
  res.sendFile(path.join(__dirname, 'public/viewreport.html'));
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/login');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ alter: true }); // Ensure the database is in sync with the models
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
