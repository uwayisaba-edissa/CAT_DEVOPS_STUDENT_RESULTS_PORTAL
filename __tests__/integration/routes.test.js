// __tests__/integration/routes.test.js
const request = require('supertest');
const app = require('../../server/index.js');

describe('Student Results Portal API', () => {
  describe('Results Routes', () => {
    test('GET /results should return all results', async () => {
      const response = await request(app)
        .get('/results')
        .expect(200);
      
      expect(response.body).toHaveProperty('success');
      expect(response.body.success).toBe(true);
    });

    test('GET /results/threshold should filter by percentage', async () => {
      const response = await request(app)
        .get('/results/threshold?percentage=75')
        .expect(200);
      
      expect(response.body).toHaveProperty('threshold');
      expect(response.body.threshold).toBe(75);
    });

    test('GET /results/threshold should reject invalid percentage', async () => {
      const response = await request(app)
        .get('/results/threshold?percentage=150')
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Health Check', () => {
    test('GET /health should return healthy status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect([200, 503]).toContain(response.status);
      expect(response.body).toHaveProperty('status');
      expect(response.body.status).toBe('healthy');
    });
  });

  describe('Student Routes', () => {
    test('GET /students should return all students', async () => {
      const response = await request(app)
        .get('/students')
        .expect(200);
      
      expect(response.body).toHaveProperty('success');
    });

    test('POST /students should create a new student', async () => {
      const response = await request(app)
        .post('/students')
        .send({ name: 'John Doe', email: 'john@example.com' })
        .expect(201);
      
      expect(response.body).toHaveProperty('success');
    });
  });
});
