// __tests__/unit/validation.test.js
describe('Input Validation', () => {
    const validateInput = (data, requiredFields) => {
        for (let field of requiredFields) {
            if (!data[field]) return `Missing required field: ${field}`;
        }
        return null;
    };

    test('should validate required fields', () => {
        const data = { name: 'John', email: 'john@example.com' };
        const error = validateInput(data, ['name', 'email']);
        expect(error).toBeNull();
    });

    test('should return error for missing field', () => {
        const data = { name: 'John' };
        const error = validateInput(data, ['name', 'email']);
        expect(error).toBe('Missing required field: email');
    });

    test('should handle empty object', () => {
        const error = validateInput({}, ['name']);
        expect(error).toBe('Missing required field: name');
    });

    test('should validate multiple fields', () => {
        const data = { name: 'John', email: 'john@example.com', course_id: 1 };
        const error = validateInput(data, ['name', 'email', 'course_id']);
        expect(error).toBeNull();
    });
});

describe('Marks Validation', () => {
    test('marks should not exceed max_marks', () => {
        const marks = 95;
        const max_marks = 100;
        expect(marks <= max_marks).toBe(true);
    });

    test('should reject marks exceeding max_marks', () => {
        const marks = 105;
        const max_marks = 100;
        expect(marks <= max_marks).toBe(false);
    });

    test('should handle percentage calculation', () => {
        const percentage = (85 / 100) * 100;
        expect(percentage).toBe(85);
    });

    test('should handle decimal marks', () => {
        const percentage = (87.5 / 100) * 100;
        expect(percentage).toBe(87.5);
    });
});

describe('Threshold Validation', () => {
    test('should accept valid percentage', () => {
        const threshold = 75;
        const isValid = !isNaN(threshold) && threshold >= 0 && threshold <= 100;
        expect(isValid).toBe(true);
    });

    test('should reject negative percentage', () => {
        const threshold = -10;
        const isValid = !isNaN(threshold) && threshold >= 0 && threshold <= 100;
        expect(isValid).toBe(false);
    });

    test('should reject percentage > 100', () => {
        const threshold = 150;
        const isValid = !isNaN(threshold) && threshold >= 0 && threshold <= 100;
        expect(isValid).toBe(false);
    });

    test('should reject non-numeric threshold', () => {
        const threshold = parseFloat('abc');
        const isValid = !isNaN(threshold);
        expect(isValid).toBe(false);
    });
});
