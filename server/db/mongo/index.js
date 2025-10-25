const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

const DatabaseManager = require('../DatabaseManager');
const { UserSchemaMongo } = require('../../models/user-model');
const { PlaylistSchemaMongo } = require('../../models/playlist-model');


class MongoDatabaseManager extends DatabaseManager
{
    /**
     * Connects to the database and creates the appropriate schemas
     */
    constructor() {
        super();
        mongoose
            .connect(process.env.DB_CONNECT, { useNewUrlParser: true })
            .catch(e => {
                console.error('Connection error', e.message)
            })
        
        this.connection = mongoose.connection

        this.schemas = {
            User: mongoose.model('User', UserSchemaMongo),
            Playlist: mongoose.model('Playlist', PlaylistSchemaMongo)
        }
    }

    getOne = async (schema, query) =>
    {
        console.log("getOne called");
        console.log(query);

        const document = await this.schemas[schema].findOne(query);
        console.log(document);

        return document;
    }

    getOneById = async (schema, id) =>
    {
        const document = await this.schemas[schema].findById(id);

        return document;
    }


    getAll = async (schema, query) => 
    {
        const documents = await this.schemas[schema].find(query);

        return documents;
    }

    updateById = async (schema, id, updatedFields) =>
    {
        return await this.schemas[schema].findByIdAndUpdate(id, updatedFields);
    }

    replaceById = async (schema, id, fields) =>
    {
        return await this.schemas[schema].findOneAndReplace({_id:id}, fields);
    }

    deleteById = async (schema, id) =>
    {
        const document = await this.schemas[schema].findByIdAndDelete(id);

        return document;
    }

    createNew = async (schema, fields) =>
    {
        const newDocument = this.schemas[schema].create(fields);

        return newDocument;
    }

}

module.exports = MongoDatabaseManager