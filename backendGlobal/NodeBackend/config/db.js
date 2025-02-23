const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connectee...');
    } catch(err){
        console.error(`Erreur de connection Mon beau: ${err.message}`);
        process.exit(1);
    }
};
module.exports = connectDB;