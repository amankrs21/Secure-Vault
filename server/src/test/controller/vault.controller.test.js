const request = require('supertest');
const app = require('../../app'); // Adjust path as needed

describe('Vault Controller Tests', () => {
    describe('Add Vault Entry', () => {
        it('should add a vault entry successfully', async () => {
            const res = await request(app)
                .post('/api/vault/add')
                .send({
                    key: 'samplekey',
                    title: 'Test Vault',
                    username: 'testuser',
                    password: 'samplepassword',
                });

            expect(res.status).toBe(201);
            expect(res.body.message).toBe('Vault Added Successfully!');
        });
    });

    // Add more tests for getVault, updateVault, deleteVault, decryptVault, etc.
});
