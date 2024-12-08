const request = require('supertest');
const app = require('../index');  // Import the app from index.js

describe('GET /', () => {
  it('should return "Hello, Node.js!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);  // Expect HTTP status 200
    expect(response.text).toBe('Hello, Node.js!');  // Expect the response text
  });
});
