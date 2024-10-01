const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully!!');
    }
    catch (error) {
        console.warn('MongoDB Connection FAILED!! \n', error);
    }
}

module.exports = connect;
