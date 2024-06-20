// testEnvironmentalImpactMetricModel.js

const User = require('../models/user');
const EnvironmentalImpactMetric = require('../models/environmentalImpactMetric');

async function createTestEnvironmentalImpactMetric() {
  try {
    // First, create a test user
    const newUser = await User.create({
      username: 'testuser4',
      email: 'testuser4@example.com',
      password: 'securepassword',
      role: 'household'
    });

    // Then, create an environmental impact metric for the test user
    const newMetric = await EnvironmentalImpactMetric.create({
      metricType: 'carbon footprint',
      value: 120.5,
      metricDate: '2023-10-01',
      userId: newUser.id
    });

    console.log('Environmental impact metric created:', newMetric.toJSON());
  } catch (error) {
    console.error('Error creating environmental impact metric:', error);
  }
}

createTestEnvironmentalImpactMetric();
