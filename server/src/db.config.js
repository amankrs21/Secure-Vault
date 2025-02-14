const mongoose = require('mongoose');

const MONGO_URL = process.env.NODE_ENV === "test" ? process.env.MONGO_URL_TEST : process.env.MONGO_URL;

const mongoConnect = async () => {
    try {
        await mongoose.connect(MONGO_URL, { retryWrites: true, w: 'majority' });
        console.info('MongoDB Connected Successfully!!');
    }
    catch (error) {
        console.warn('MongoDB Connection FAILED!! \n', error);
    }
}

module.exports = mongoConnect;
