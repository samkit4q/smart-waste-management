// testRecyclingEffortModel.js

const User = require('../models/user');
const RecyclingEffort = require('../models/recyclingEffort');

async function createTestRecyclingEffort() {
  try {
    // First, create a test user
    const newUser = await User.create({
      username: 'testuser5',
      email: 'testuser5@example.com',
      password: 'secure_password',
      role: 'household'
    });

    // Then, create a recycling effort for the test user
    const newEffort = await RecyclingEffort.create({
      item : 'test item',
      amountRecycled: 50,
      recyclingDate: '2023-10-01',
      userId: newUser.id
    });

    console.log('Recycling effort created:', newEffort.toJSON());
  } catch (error) {
    console.error('Error creating recycling effort:', error);
  }
}

createTestRecyclingEffort();
