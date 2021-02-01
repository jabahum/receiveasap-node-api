//Connection string for the database
//Used in Docker containers and development environments
const database_connection_string = process.env.KAKASADBURLLOCAL || "mongodb://localhost:27017/efris_middleware" ;
module.exports = {

    development: {
        connection_string: database_connection_string,
        params: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    },
    //Connection to Mongo Atlas
    //Used by the Kumusoft Online test platform (https://efris.kumusoft.com)
    mongo_atlas: {
        connection_string: 'mongodb+srv://kakasa:Kax3fr1s23@maintestdb.cqitf.gcp.mongodb.net/?authSource=admin&readPreference=primary',
        params: {
            user: "kakasa",
            pass: "Kax3fr1s23",
            dbName: "efris_middleware",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    }
}