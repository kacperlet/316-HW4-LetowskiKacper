const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const DatabaseManager = require('../DatabaseManager');
const { UserSchemaPostgre, UserOptionsPostgre } = require('../postgre/user-model');
const { PlaylistSchemaPostgre, PlaylistOptionsPostgre } = require('../postgre/playlist-model');


class PostgreDatabaseManager extends DatabaseManager
{
    /**
     * Connects to the database and creates the appropriate schemas
     */
    constructor() {
        super();
        let dbURI = process.env.DB_CONNECT_POSTGRE;
        if (!dbURI)
        {
            console.log("DB_CONNECT_POSTGRE not set in .env file");
            console.log("aborting...");
            this.connection == null;
            return;
        }

        console.log("Attempting to connect...");
        const sequelize = new Sequelize(dbURI);
        
        this.connection = sequelize.connectionManager

        const User = sequelize.define(
            'User',
            UserSchemaPostgre,
            UserOptionsPostgre
        );

        const Playlist = sequelize.define(
            'Playlist',
            PlaylistSchemaPostgre,
            PlaylistOptionsPostgre
        );
        sequelize.sync();

        this.schemas = {
            User: User,
            Playlist: Playlist
        }
    }

    getOne = async (schema, query) =>
    {
        console.log("getOne called");
        console.log(query);

        const document = await this.schemas[schema].findOne({where: query})
        console.log(document);

        return document;
    }

    getOneById = async (schema, id) =>
    {
        const document = await this.schemas[schema].findByPk(id);

        return document;
    }


    getAll = async (schema, query) => 
    {
        const documents = await this.schemas[schema].findAll({where: query});

        return documents;
    }

    updateById = async (schema, id, updatedFields) =>
    {
        return await this.schemas[schema].update(updatedFields, {where: {_id: id}});
    }

    deleteById = async (schema, id) =>
    {
        const document = await this.schemas[schema].destroy({where: {_id: id}});

        return document;
    }

    createNew = async (schema, fields) =>
    {
        const newDocument = this.schemas[schema].create(fields);

        return newDocument;
    }

}

module.exports = PostgreDatabaseManager