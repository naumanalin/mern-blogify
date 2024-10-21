const mongoose = require('mongoose')

const DBCon = async ()=>{
    try {
        mongoose.connect(process.env.MONGOOSE_URL);
        console.log('MONGODB IS CONNECTED SUCCESSFULLY ...')
    } catch (error) {
        console.log(`MONGODB ERROR: ${error}`)
    }
}

module.exports = DBCon;