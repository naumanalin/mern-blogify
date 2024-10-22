const mongoose = require('mongoose');
require('dotenv').config();

const DBCon = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,  // Helps handle MongoDB connection string parsing
            useUnifiedTopology: true,  // Uses the MongoDB driver's unified topology engine
        });
        console.log('MONGODB IS CONNECTED SUCCESSFULLY ...');
    } catch (error) {
        console.error(`MONGODB ERROR: ${error.message}`);
    }
};

module.exports = DBCon;

