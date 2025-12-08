// __tests__/unit/calculations.test.js
describe('Grade Calculations', () => {
    test('should calculate percentage correctly', () => {
        const percentage = (85 / 100) * 100;
        expect(percentage).toBe(85);
    });

    test('should handle edge case - zero marks', () => {
        const percentage = (0 / 100) * 100;
        expect(percentage).toBe(0);
    });

    test('should handle edge case - full marks', () => {
        const percentage = (100 / 100) * 100;
        expect(percentage).toBe(100);
    });

    test('should round percentage to 2 decimals', () => {
        const percentage = Math.round((88.8888 / 100) * 100 * 100) / 100;
        expect(percentage).toBe(88.89);
    });

    test('should calculate GPA (simple average)', () => {
        const marks = [85, 90, 78, 92];
        const gpa = marks.reduce((a, b) => a + b) / marks.length;
        expect(Math.round(gpa * 100) / 100).toBe(86.25);
    });

    test('should filter students by threshold', () => {
        const students = [
            { name: 'Alice', percentage: 85 },
            { name: 'Bob', percentage: 72 },
            { name: 'Charlie', percentage: 78 }
        ];
        const threshold = 75;
        const passed = students.filter(s => s.percentage >= threshold);
        expect(passed.length).toBe(2);
        expect(passed.map(s => s.name)).toEqual(['Alice', 'Charlie']);
    });

    test('should identify top performer', () => {
        const results = [
            { student: 'Alice', percentage: 92 },
            { student: 'Bob', percentage: 88 },
            { student: 'Charlie', percentage: 95 }
        ];
        const topPerformer = results.reduce((max, curr) => 
            curr.percentage > max.percentage ? curr : max
        );
        expect(topPerformer.student).toBe('Charlie');
    });
});

describe('Class Statistics', () => {
    const classMarks = [45, 67, 78, 82, 88, 90, 91, 75, 73, 80];

    test('should calculate class average', () => {
        const average = classMarks.reduce((a, b) => a + b) / classMarks.length;
        expect(Math.round(average * 100) / 100).toBe(76.9);
    });

    test('should find median', () => {
        const sorted = [...classMarks].sort((a, b) => a - b);
        const median = sorted.length % 2 === 0
            ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
            : sorted[Math.floor(sorted.length / 2)];
        expect(median).toBe(79.5);
    });

    test('should find highest score', () => {
        const highest = Math.max(...classMarks);
        expect(highest).toBe(91);
    });

    test('should find lowest score', () => {
        const lowest = Math.min(...classMarks);
        expect(lowest).toBe(45);
    });

    test('should count pass/fail at 60%', () => {
        const passThreshold = 60;
        const passed = classMarks.filter(m => m >= passThreshold).length;
        const failed = classMarks.filter(m => m < passThreshold).length;
        expect(passed).toBe(9);
        expect(failed).toBe(1);
    });
});
