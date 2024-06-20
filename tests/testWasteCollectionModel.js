// testWasteCollectionModel.js

const User = require('../models/user');
const WasteCollectionSchedule = require('../models/wasteCollectionSchedule');

async function createTestWasteCollectionSchedule() {
  try {
    // First, create a test user
    const newUser = await User.create({
      username: 'testuser1',
      email: 'testuser1@example.com',
      password: 'securepassword',
      role: 'household'
    });

    // Then, create a waste collection schedule for the test user
    const newSchedule = await WasteCollectionSchedule.create({
      collectionDate: '2024-10-01',
      collectionType: 'organic',
      isRecycled: true,
      userId: newUser.id
    });

    console.log('Waste collection schedule created:', newSchedule.toJSON());
  } catch (error) {
    console.error('Error creating waste collection schedule:', error);
  }
}

createTestWasteCollectionSchedule();
