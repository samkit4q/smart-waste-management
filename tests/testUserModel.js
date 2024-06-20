// testUserModel.js

const User = require('../models/user');

async function createTestUser() {
  try {
    const newUser = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'securepassword',
      role: 'household'
    });
    console.log('User created:', newUser.toJSON());
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createTestUser();
