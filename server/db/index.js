const dotenv = require('dotenv');
const MongoDatabaseManager = require('./mongo');
const PostgreDatabaseManager = require('./postgre');
dotenv.config();

const databaseType = process.env.SELECTED_DB;

let db = null;
if (databaseType === 'mongo')
    db = new MongoDatabaseManager();
else
    db = new PostgreDatabaseManager();


module.exports = db

