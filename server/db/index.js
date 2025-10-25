
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const MongoDatabaseManager = require('./mongo');
dotenv.config();

const db = new MongoDatabaseManager();


module.exports = db

