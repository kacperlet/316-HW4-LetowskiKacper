const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { DataTypes } = require('sequelize');
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const PlaylistSchemaMongo = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        songs: { type: [{
            title: String,
            artist: String,
            year: Number,
            youTubeId: String
        }], required: true }
    },
    { timestamps: true },
)

const PlaylistSchemaPostgre = 
{
    _id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    ownerEmail: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    songs: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false
    }
}

const PlaylistOptionsPostgre =
{
    timestamps: true
}

module.exports = 
{
    PlaylistSchemaMongo: PlaylistSchemaMongo,
    PlaylistSchemaPostgre: PlaylistSchemaPostgre,
    PlaylistOptionsPostgre: PlaylistOptionsPostgre
}
