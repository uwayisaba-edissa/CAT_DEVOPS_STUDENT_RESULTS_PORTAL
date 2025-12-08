// __tests__/integration/routes.test.js
const request = require('supertest');

// Mock express app for testing
const mockApp = require('../../index.js');

describe('Student Routes', () => {
    test('GET /students should return students list', async () => {
        const response = await request(mockApp)
            .get('/students')
            .expect(200);
        
        expect(response.body).toHaveProperty('success');
        expect(response.body).toHaveProperty('data');
    });

    test('GET /students/:id should return single student', async () => {
        const response = await request(mockApp)
            .get('/students/1')
            .expect(200);
        
        expect(response.body).toHaveProperty('success');
    });

    test('POST /students should create student', async () => {
        const response = await request(mockApp)
            .post('/students')
            .send({
                name: 'Test Student',
                email: 'test@example.com'
            });
        
        expect([200, 201]).toContain(response.status);
        expect(response.body).toHaveProperty('success');
    });

    test('POST /students should validate required fields', async () => {
        const response = await request(mockApp)
            .post('/students')
            .send({
                name: 'Test Student'
                // missing email
            });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});

describe('Course Routes', () => {
    test('GET /courses should return courses list', async () => {
        const response = await request(mockApp)
            .get('/courses')
            .expect(200);
        
        expect(response.body).toHaveProperty('success');
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('POST /courses should create course', async () => {
        const response = await request(mockApp)
            .post('/courses')
            .send({
                name: 'Mathematics',
                code: 'MATH101',
                credits: 3
            });
        
        expect([200, 201]).toContain(response.status);
    });

    test('POST /courses should validate required fields', async () => {
        const response = await request(mockApp)
            .post('/courses')
            .send({
                name: 'Mathematics'
                // missing code and credits
            });
        
        expect(response.status).toBe(400);
    });
});

describe('Marks Routes', () => {
    test('GET /marks should return all marks', async () => {
        const response = await request(mockApp)
            .get('/marks')
            .expect(200);
        
        expect(response.body).toHaveProperty('success');
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('GET /students/:id/marks should return student marks', async () => {
        const response = await request(mockApp)
            .get('/students/1/marks')
            .expect(200);
        
        expect(response.body).toHaveProperty('success');
    });

    test('GET /courses/:id/marks should return course marks', async () => {
        const response = await request(mockApp)
            .get('/courses/1/marks')
            .expect(200);
        
        expect(response.body).toHaveProperty('success');
    });

    test('POST /marks should validate marks <= max_marks', async () => {
        const response = await request(mockApp)
            .post('/marks')
            .send({
                student_id: 1,
                course_id: 1,
                marks: 150,
                max_marks: 100
            });
        
        expect(response.status).toBe(400);
        expect(response.body.error).toContain('cannot exceed');
    });

    test('POST /marks should accept valid marks', async () => {
        const response = await request(mockApp)
            .post('/marks')
            .send({
                student_id: 1,
                course_id: 1,
                marks: 85,
                max_marks: 100
            });
        
        expect([200, 201]).toContain(response.status);
    });
});

describe('Results Routes', () => {
    test('GET /students/:id/transcript should return student transcript', async () => {
        const response = await request(mockApp)
            .get('/students/1/transcript')
            .expect(200);
        
        expect(response.body).toHaveProperty('success');
        expect(response.body.data).toHaveProperty('student_id');
    });

    test('GET /courses/:id/results should return course statistics', async () => {
        const response = await request(mockApp)
            .get('/courses/1/results')
            .expect(200);
        
        expect(response.body).toHaveProperty('success');
    });

    test('GET /results/threshold should filter by percentage', async () => {
        const response = await request(mockApp)
            .get('/results/threshold?percentage=75')
            .expect(200);
        
        expect(response.body).toHaveProperty('threshold');
        expect(response.body.threshold).toBe(75);
    });

    test('GET /results/threshold should reject invalid percentage', async () => {
        const response = await request(mockApp)
            .get('/results/threshold?percentage=150')
            .expect(400);
        
        expect(response.body).toHaveProperty('error');
    });
});

describe('Health Check', () => {
    test('GET /health should return healthy status', async () => {
        const response = await request(mockApp)
            .get('/health');
        
        expect([200, 503]).toContain(response.status);
        expect(response.body).toHaveProperty('status');
    });
});
