//handle db connection with mongoose
const mongoose = require('mongoose');
let dbconfig = require('../config/db.config');
//mongodb+srv://admin:<password>@test.oamsg.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority
const connectDB = async () => {
    var conn = process.env.DBSTORE == "ATLAS" ? dbconfig.mongo_atlas : dbconfig.development;
        mongoose.connect(conn.connection_string, {
                user: conn.params.user,
                pass: conn.params.pass,
                dbName: conn.params.dbName,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            })
            .then(() => {
                console.log('🔖 DB Connected successfully');
            })
            .catch(err => {
                console.error('Database connection error: ' + err.toString())
            });

}

module.exports = connectDB;