const mongoose = require('mongoose');

const mongoConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB Connected Successfully!!');
    }
    catch (error) {
        console.warn('MongoDB Connection FAILED!! \n', error);
    }
}

module.exports = mongoConnect;
