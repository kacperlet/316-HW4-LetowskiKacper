const dotenv = require('dotenv').config({ path: __dirname + '/../../../.env' });

async function clearCollection(collection, collectionName) {
    try {
        await collection.deleteMany({});
        console.log(collectionName + " cleared");
    }
    catch (err) {
        console.log(err);
    }
}

async function fillCollection(collection, collectionName, data) {
    for (let i = 0; i < data.length; i++) {
        let doc = new collection(data[i]);
        await doc.save();
    }
    console.log(collectionName + " filled");
}

async function resetMongo() {
    const {PlaylistSchemaMongo} = require('../../../models/playlist-model')
    const {UserSchemaMongo} = require("../../../models/user-model")
    const testData = require("../example-db-data.json")

    const PlaylistModel = mongoose.model('Playlist', PlaylistSchemaMongo)
    const UserModel = mongoose.model('User', UserSchemaMongo)

    console.log("Resetting the Mongo DB")
    await clearCollection(PlaylistModel, "Playlist");
    await clearCollection(UserModel, "User");
    await fillCollection(PlaylistModel, "Playlist", testData.playlists);
    await fillCollection(UserModel, "User", testData.users);
}

const mongoose = require('mongoose')
mongoose
    .connect(process.env.DB_CONNECT, { useNewUrlParser: true })
    .then(() => { resetMongo() })
    .catch(e => {
        console.error('Connection error', e.message)
    })


