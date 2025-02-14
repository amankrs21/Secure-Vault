require("dotenv").config();
const mongoose = require('mongoose');
const mongoConnect = require('../db.config');

describe('Controller Tests', () => {
    beforeAll(async () => {
        await mongoConnect();  // Wait for DB connection
    });

    // Disconnect DB after all tests
    afterAll(async () => {
        // Drop the test database after tests
        if (mongoose.connection.db) {
            await mongoose.connection.db.dropDatabase();
            console.log("Test database dropped");
        }
        // Disconnect the mongoose connection
        await mongoose.disconnect();
    });

    require('./controller/user.controller.test');
    // require('./controller/pin.controller.test');
    // require('./controller/journal.controller.test');
    // require('./controller/vault.controller.test');
});
