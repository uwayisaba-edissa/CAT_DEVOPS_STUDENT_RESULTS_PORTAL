# Student Results Portal

A comprehensive student results management system built with Express.js and MySQL. Features multi-table database design, RESTful API endpoints, and automated testing.

## Features

- **Student Management**: Create, read, update, delete student records
- **Course Management**: Manage courses with codes and credit values
- **Marks Recording**: Track student marks with validation
- **Results Generation**: Generate transcripts and course statistics
- **Threshold Filtering**: Find students with marks above specified percentage
- **Comprehensive Reporting**: Class averages, student transcripts, course analytics
- **Health Checks**: Database connectivity monitoring
- **Input Validation**: Request validation on all endpoints
- **Error Handling**: Comprehensive error responses
- **Automated Testing**: Unit, integration, and database schema tests

## Tech Stack

- **Backend**: Express.js 4.18.2
- **Database**: MySQL 8.0+
- **Testing**: Jest 29.5.0 with Supertest
- **Development**: Nodemon for hot reload

## Database Schema

### students
```sql
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### courses
```sql
CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    credits INT NOT NULL
);
```

### marks
```sql
CREATE TABLE marks (
    mark_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    marks DECIMAL(5,2),
    max_marks DECIMAL(5,2),
    exam_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
```

## Installation

### Prerequisites
- Node.js 14+ and npm
- MySQL 8.0+

### Setup Steps

1. **Clone/navigate to project directory**
```bash
cd student_results_portal
```

2. **Install dependencies**
```bash
npm install
```

3. **Create MySQL database**
```bash
mysql -u root -p
CREATE DATABASE student_results_db;
USE student_results_db;

-- Run the schema creation statements above
```

4. **Configure environment** (optional)
Create `.env` file:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=student_results_db
```

5. **Start the server**
```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

Server runs on `http://localhost:3000`

## API Endpoints

### Students
- `GET /students` - Get all students
- `GET /students/:id` - Get student by ID
- `POST /students` - Create student
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student

### Courses
- `GET /courses` - Get all courses
- `POST /courses` - Create course

### Marks
- `GET /marks` - Get all marks
- `GET /students/:id/marks` - Get student's marks
- `GET /courses/:id/marks` - Get course marks
- `POST /marks` - Record student marks
- `PUT /marks/:id` - Update marks

### Results
- `GET /students/:id/transcript` - Student transcript with statistics
- `GET /courses/:id/results` - Course statistics
- `GET /results/threshold?percentage=75` - Students above threshold

### Health
- `GET /health` - Health check with database status

## Request/Response Examples

### Create Student
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

Response:
```json
{
  "success": true,
  "message": "Student created",
  "student_id": 1
}
```

### Record Marks
```bash
curl -X POST http://localhost:3000/marks \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": 1,
    "course_id": 1,
    "marks": 85,
    "max_marks": 100
  }'
```

### Get Student Transcript
```bash
curl http://localhost:3000/students/1/transcript
```

Response:
```json
{
  "success": true,
  "data": {
    "student_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "total_courses": 3,
    "average_percentage": 87.5,
    "total_credits": 9
  }
}
```

### Filter by Threshold
```bash
curl "http://localhost:3000/results/threshold?percentage=80"
```

## Testing

Run the comprehensive test suite:

```bash
# Run all tests with coverage
npm test

# Run specific test suite
npm run test:unit          # Unit tests
npm run test:integration   # Integration tests

# Watch mode for development
npm run test:watch
```

### Test Coverage

- **Unit Tests**: Validation, calculations, grade computations
- **Integration Tests**: API route testing
- **Database Tests**: Schema validation, query testing

Test files:
- `__tests__/unit/validation.test.js` - Input validation
- `__tests__/unit/calculations.test.js` - Grade and statistics calculations
- `__tests__/integration/routes.test.js` - API endpoint testing
- `__tests__/database/schema.test.js` - Schema and data integrity

## DevOps & Deployment

### Features for Production
- Graceful shutdown handling (SIGTERM, SIGINT)
- Health check endpoint for load balancers
- Parameterized queries to prevent SQL injection
- Connection error recovery
- Request logging and monitoring

### Docker (Optional)
```dockerfile
FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t student-results-portal .
docker run -p 3000:3000 --env-file .env student-results-portal
```

### Load Balancer Integration
Use the `/health` endpoint for health checks:
```bash
curl http://localhost:3000/health
```

Returns:
```json
{
  "status": "healthy",
  "database": "connected"
}
```

### Monitoring
Log entries include:
- Request method, path, status code
- Response duration
- Error messages and stack traces
- Database connection errors

### Scaling Considerations
- Use connection pooling for MySQL
- Implement caching for frequently accessed data
- Consider database replication for read scaling
- Use pm2 for process management in production

## Error Handling

All errors return consistent format:
```json
{
  "success": false,
  "error": "Error description"
}
```

Status codes:
- `200 OK` - Successful request
- `201 Created` - Resource created
- `400 Bad Request` - Validation error
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error
- `503 Service Unavailable` - Database disconnected

## Performance Tips

1. **Indexing**: Add indexes on frequently queried columns
```sql
CREATE INDEX idx_student_id ON marks(student_id);
CREATE INDEX idx_course_id ON marks(course_id);
CREATE INDEX idx_exam_date ON marks(exam_date);
```

2. **Pagination**: Implement for large result sets
3. **Caching**: Cache frequently accessed transcripts
4. **Query Optimization**: Use EXPLAIN to analyze queries

## Linting

```bash
npm run lint           # Check code style
npm run lint:fix       # Auto-fix issues
```

## License

MIT

## Support

For issues or questions, check error logs and health endpoint status.

## Development Checklist

- [x] Multi-table database design
- [x] RESTful API implementation
- [x] Input validation and error handling
- [x] Comprehensive test automation
- [x] Health check and monitoring
- [x] Graceful shutdown
- [x] Production-ready code
- [ ] Database migrations
- [ ] API documentation (Swagger)
- [ ] Rate limiting
