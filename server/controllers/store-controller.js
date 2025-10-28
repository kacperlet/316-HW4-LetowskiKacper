// const Playlist = require('../models/playlist-model')
// const User = require('../models/user-model');
const db = require('../db')
const auth = require('../auth')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    const body = req.body;
    console.log("createPlaylist body: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }
    
    const playlist = await db.Playlist.createNew(body);
    console.log("playlist: " + playlist.toString());
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    let user = await db.User.getOneById(req.userId)
    if (user)
    {
        console.log("user found: " + JSON.stringify(user));
        if (!user.playlists)
        {
            user.playlists = [];
        }
        user.playlists.push(playlist._id);
        db.User.updateById(user._id, {playlists: user.playlists})
            .then(() => {
                return res.status(201).json({
                    playlist: playlist
                })
            })
            .catch(error => {
                return res.status(400).json({
                    errorMessage: 'Playlist Not Created!'
                })
            });
    }
    else
    {
        console.log("Unexpected error");
        return res.status(400).json({
            errorMessage: 'Playlist Not Created!'
        })
    }
}
deletePlaylist = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    console.log("delete Playlist with id: " + JSON.stringify(req.params.id));
    console.log("delete " + req.params.id);
    let playlist = await db.Playlist.getOneById(req.params.id);
    if (playlist)
    {
        console.log("playlist found: " + JSON.stringify(playlist));
        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            let user = await db.User.getOne({ email: list.ownerEmail });
            if (user)
            {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    await db.Playlist.deleteById(req.params.id);
                    // TODO: check for failure and error
                    return res.status(200).json({});
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ 
                        errorMessage: "authentication error" 
                    });
                }
            }
        }
        asyncFindUser(playlist);
    }
    else
    {
        return res.status(404).json({
            errorMessage: 'Playlist not found!',
        })
    }
    
}
getPlaylistById = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    console.log("Find Playlist with id: " + JSON.stringify(req.params.id));

    let list = await db.Playlist.getOneById(req.params.id)
        .catch(err => console.log(err));
    if (!list)
    {
        return res.status(400).json({ success: false, error: "list not found" });
    }
    else
    {
        console.log("Found list: " + JSON.stringify(list));

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            let user = await db.User.getOne({ email: list.ownerEmail });

            console.log("user._id: " + user._id);
            console.log("req.userId: " + req.userId);
            if (user._id == req.userId) {
                console.log("correct user!");
                return res.status(200).json({ success: true, playlist: list })
            }
            else {
                console.log("incorrect user!");
                return res.status(400).json({ success: false, description: "authentication error" });
            }
        }
        asyncFindUser(list);
    }
}
getPlaylistPairs = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    console.log("getPlaylistPairs");
    let user = await db.User.getOneById(req.userId)
        .catch(err => console.log(err));
    if (user)
    {
        console.log("find user with id " + req.userId);
        async function asyncFindList(email) {
            console.log("find all Playlists owned by " + email);
            let playlists = await db.Playlist.getAll({ ownerEmail: email })
                .catch(err => console.log(err));
            if (playlists)
            {
                console.log("found Playlists: " + JSON.stringify(playlists));
                console.log("Send the Playlist pairs");
                // PUT ALL THE LISTS INTO ID, NAME PAIRS
                let pairs = [];
                for (let key in playlists) {
                    let list = playlists[key];
                    let pair = {
                        _id: list._id,
                        name: list.name
                    };
                    pairs.push(pair);
                }
                return res.status(200).json({ success: true, idNamePairs: pairs })
            }
            else
            {
                console.log("!playlists.length");
                return res
                    .status(404)
                    .json({ success: false, error: 'Playlists not found' })
            }
        }
        asyncFindList(user.email);
    }
    else
    {
        return res.status(400).json({ success: false, error: "User not found" })
    }
}
getPlaylists = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    let playlists = await db.Playlist.getAll({})
        .catch(err => console.log(err));
    if (playlists)
    {
        return res.status(200).json({ success: true, data: playlists })
    }
    else
    {
        return res
            .status(404)
            .json({ success: false, error: `Playlists not found` })
    }
}
updatePlaylist = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    const body = req.body
    console.log("updatePlaylist: " + JSON.stringify(body));
    console.log("req.body.name: " + req.body.name);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    let playlist = await db.Playlist.getOneById(req.params.id);
    if (playlist)
    {
        console.log("playlist found: " + JSON.stringify(playlist));
        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            let user = await db.User.getOne({ email: list.ownerEmail });
            console.log("user._id: " + user._id);
            console.log("req.userId: " + req.userId);
            if (user._id == req.userId) {
                console.log("correct user!");
                console.log("req.body.name: " + req.body.name);

                db.Playlist.updateById(list._id, {name: body.playlist.name, songs: body.playlist.songs})
                    .catch(error => {
                        console.log("FAILURE: " + JSON.stringify(error));
                        return res.status(404).json({
                            error,
                            message: 'Playlist not updated!',
                        })
                    });             
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: list._id,
                    message: 'Playlist updated!',
                })   
            }
            else {
                console.log("incorrect user!");
                return res.status(400).json({ success: false, description: "authentication error" });
            }
        }
        asyncFindUser(playlist);
    }
    else
    {
        return res.status(404).json({
            err,
            message: 'Playlist not found!',
        })
    }
}
module.exports = {
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getPlaylistPairs,
    getPlaylists,
    updatePlaylist
}