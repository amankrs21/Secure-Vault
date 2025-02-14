const request = require('supertest');
const app = require('../../app'); // Adjust path as needed

describe('Pin Controller Tests', () => {
    describe('Verify Encryption Key', () => {
        it('should verify encryption key successfully', async () => {
            const res = await request(app)
                .post('/api/pin/verify')
                .send({ key: 'samplekey' });

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('Encryption Key is verified successfully!');
        });
    });

    // Add more tests for setVerifyText, resetPin, etc.
});
