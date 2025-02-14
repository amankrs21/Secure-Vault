const request = require('supertest');
const app = require('../../app'); // Adjust path as needed

describe('Journal Controller Tests', () => {
    describe('Add Journal', () => {
        it('should add a journal successfully', async () => {
            const res = await request(app)
                .post('/api/journal/add')
                .send({
                    key: 'samplekey',
                    title: 'Test Journal',
                    content: 'Sample content',
                });

            expect(res.status).toBe(201);
            expect(res.body.message).toBe('Journal Added Successfully!');
        });
    });

    // Add more tests for getJournal, updateJournal, deleteJournal, decryptJournal, etc.
});
