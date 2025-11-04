const { DataTypes } = require('sequelize');

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
    UserSchemaPostgre: UserSchemaPostgre,
    UserOptionsPostgre: UserOptionsPostgre
}
