//handle db connection with mongoose
const mongoose = require('mongoose');
//mongodb+srv://admin:<password>@test.oamsg.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        // development: {
        //     connection_string:"mongodb://localhost:27017/receiveasap_api",
        //     params: {
        //         useNewUrlParser: true,
        //         useUnifiedTopology: true,
        //         useCreateIndex: true
        //     }
        // },
        //Connection to Mongo Atlas
        //Used by the Kumusoft Online test platform (https://efris.kumusoft.com)
        mongo_atlas: {
            connection_string: 'mongodb+srv://admin:password@test.oamsg.gcp.mongodb.net/test?retryWrites=true&w=majority',
            params: {
                user: "admin",
                pass: "password",
                dbName: "receiveasap_api",
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        }
    });

    console.log(`🔖 DB Connected successfully to: ${conn.connection.host}`);
}

module.exports = connectDB;