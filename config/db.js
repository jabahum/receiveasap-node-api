//handle db connection with mongoose
const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    console.log(`🔖 DB Connected successfully to: ${conn.connection.host}`);
}

module.exports = connectDB;