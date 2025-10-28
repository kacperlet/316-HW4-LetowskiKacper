const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const { Sequelize, DataTypes } = require('sequelize');

const UserSchemaMongo = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        passwordHash: { type: String, required: true },
        playlists: [{type: ObjectId, ref: 'Playlist'}]
    },
    { timestamps: true },
)

const UserSchemaPostgre = 
{
    _id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Auto-generates id
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    email: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    playlists: {
        type: DataTypes.ARRAY(DataTypes.UUID)
    }
}

const UserOptionsPostgre =
{
    timestamps: true
}

module.exports = 
{
    UserSchemaMongo: UserSchemaMongo,
    UserSchemaPostgre: UserSchemaPostgre,
    UserOptionsPostgre: UserOptionsPostgre
}
