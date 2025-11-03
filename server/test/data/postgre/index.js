const dotenv = require('dotenv').config({ path: __dirname + '/../../../.env' });

async function clearTable(table, tableName) {
    try {
        await table.truncate();
        console.log(tableName + " cleared");
    }
    catch (err) {
        console.log(err);
    }
}

async function fillTable(table, tableName, data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i]._id)
            data[i]._id = convertToUUID(data[i]._id);

        if (data[i].playlists)
        {
            for(let j = 0; j < data[i].playlists.length; j++)
            {
                data[i].playlists[j] = convertToUUID(data[i].playlists[j]);
            }
        }

        await table.create(data[i]);
    }
    console.log(tableName + " filled");
}

/**
 * @param {*} id 12 byte id
 * @returns a 16 byte UUID given a 12 byte mongo _ID
 */
function convertToUUID(id)
{
    return '00000000' + id;
}

async function resetPostgres(sequelize) {
    const testData = require("../example-db-data.json")
    
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return;
    }

    const {PlaylistSchemaPostgre, PlaylistOptionsPostgre} = require('../../../models/playlist-model')
    const {UserSchemaPostgre, UserOptionsPostgre} = require("../../../models/user-model")

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

    await clearTable(Playlist, "Playlists");
    await clearTable(User, "Users");
    await fillTable(Playlist, "Playlists", testData.playlists);
    return await fillTable(User, "Users", testData.users);
}

const { Sequelize } = require('sequelize');

let dbURI = process.env.DB_CONNECT_POSTGRE;
if (!dbURI)
{
    console.log("DB_CONNECT_POSTGRE not set in .env file");
    console.log("aborting...");
    return;
}

console.log("Attempting to connect...");
const sequelize = new Sequelize(dbURI);

module.exports = resetPostgres(sequelize);