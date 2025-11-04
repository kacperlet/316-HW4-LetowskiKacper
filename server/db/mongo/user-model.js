const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

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

module.exports = 
{
    UserSchemaMongo: UserSchemaMongo,
}
