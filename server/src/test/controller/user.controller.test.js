const request = require('supertest');
const app = require('../../app');

describe('User Controller Tests', () => {

    let token;

    describe('User Registration', () => {
        it('should register successfully with valid credentials', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    dob: '1990-01-01',
                    answer: 'test answer',
                    password: 'password123'
                });

            expect(res.status).toBe(201);
            expect(res.body.message).toBe('User Registered Successfully!!');
        });

        it('should fail registration with existing email', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    dob: '1990-01-01',
                    answer: 'test answer',
                    password: 'password123'
                });

            expect(res.status).toBe(409);
            expect(res.body.message).toBe('Email Already Exist!!');
        });
    });


    describe('User Login', () => {
        it('should login successfully with valid credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
            token = res.body.token;
        });

        it('should fail login with invalid credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({ email: 'wrong@example.com', password: 'wrongpassword' });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Bad Credentials!');
        });
    });

    describe('Forget Password', () => {
        it('should change password successfully with valid credentials', async () => {
            const res = await request(app)
                .patch('/api/auth/forget')
                .send({
                    email: 'test@example.com',
                    dob: '1990-01-01',
                    answer: 'test answer',
                    password: 'newpassword123'
                });

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('Password Changed Successfully!');
        });

        it('should fail to change password with invalid credentials', async () => {
            const res = await request(app)
                .patch('/api/auth/forget')
                .send({
                    email: 'wrong@example.com',
                    dob: '1990-01-01',
                    answer: 'wrong answer',
                    password: 'newpassword123'
                });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Bad Credentials!');
        });
    });

    describe('Get User Data', () => {
        it('should return user data successfully', async () => {
            const res = await request(app)
                .get('/api/auth/user')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('email', 'test@example.com');
        });
    });

    describe('Update User', () => {
        it('should update user successfully with valid data', async () => {
            const res = await request(app)
                .patch('/api/auth/user/update')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Updated User',
                    dateOfBirth: '1990-01-01',
                    secretAnswer: 'updated answer'
                });

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('User Updated Successfully!!');
        });
    });

    describe('Change Password', () => {
        it('should change password successfully with valid data', async () => {
            const res = await request(app)
                .patch('/api/auth/user/changePassword')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    oldPassword: 'newpassword123',
                    newPassword: 'newpassword'
                });

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('Password Changed Successfully!');
        });
    });

    describe('Delete User', () => {
        it('should delete user successfully', async () => {
            const res = await request(app)
                .delete('/api/auth/user/delete')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(204);
        });
    });
});
