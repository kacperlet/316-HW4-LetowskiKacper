const { DataTypes } = require('sequelize');
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/

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
    PlaylistSchemaPostgre: PlaylistSchemaPostgre,
    PlaylistOptionsPostgre: PlaylistOptionsPostgre
}
