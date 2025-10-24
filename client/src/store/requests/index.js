/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

const baseURL =  'http://localhost:4000/store';

async function request(method, url, data)
{
    let payload = {
        method: method,
        mode: 'cors',  
        cache: 'no-cache',  
        credentials: 'include',  
        headers: {  
            'Content-Type': 'application/json'  
        },  
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
    }
    if (data)
        payload['body'] = JSON.stringify(data);

    const response = await fetch(baseURL + url, payload);

    // create an object similar in structure to an axios response
    const responseObject = {
        status: response.status,
    }
    if (response.headers.get("content-length") != 0)
    {
        responseObject["data"] = await response.json();
    }

    return responseObject;
}

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const createPlaylist = (newListName, newSongs, userEmail) => {
    return request('POST', `/playlist/`, {
        // SPECIFY THE PAYLOAD
        name: newListName,
        songs: newSongs,
        ownerEmail: userEmail
    })
}
export const deletePlaylistById = (id) => request('DELETE', `/playlist/${id}`)
export const getPlaylistById = (id) => request('GET', `/playlist/${id}`)
export const getPlaylistPairs = () => request('GET', `/playlistpairs/`)
export const updatePlaylistById = (id, playlist) => {
    return request('PUT', `/playlist/${id}`, {
        // SPECIFY THE PAYLOAD
        playlist : playlist
    })
}

const apis = {
    createPlaylist,
    deletePlaylistById,
    getPlaylistById,
    getPlaylistPairs,
    updatePlaylistById
}

export default apis
