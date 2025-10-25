class DatabaseManager
{
    schemas = {
        'User': null,
        'Playlist': null
    }

    /**
     * Connects to the database and creates the appropriate schemas
     */
    constructor() {}

    /*  ABSTRACT METHODS  */
    getOne = async (schema, query) => {}
    getOneById = async (schema, id) => {}
    getAll = async (schema, query) => {}
    updateById = async (schema, id, updatedFields) => {}
    replaceById = async (schema, id, fields) => {}
    deleteById = async (schema, id) => {}
    createNew = async (schema, fields) => {}
    /* ------ */

    User = {
        getOne: async (query) => {return this.getOne('User', query)},
        getOneById: async (id) => {return this.getOneById('User', id)},
        getAll: async (query) => {return this.getAll('User', query)},
        updateById: async (id, updatedFields) => {return this.updateById('User', id, updatedFields)},
        replaceById: async (id, fields) => {return this.replaceById('User', id, fields)},
        deleteById: async (id) => {return this.deleteById('User', id)},
        createNew: async (fields) => {return this.createNew('User', fields)},
    }

    Playlist = {
        getOne: async (query) => {return this.getOne('Playlist', query)},
        getOneById: async (id) => {return this.getOneById('Playlist', id)},
        getAll: async (query) => {return this.getAll('Playlist', query)},
        updateById: async (id, updatedFields) => {return this.updateById('Playlist', id, updatedFields)},
        replaceById: async (id, fields) => {return this.replaceById('Playlist', id, fields)},
        deleteById: async (id) => {return this.deleteById('Playlist', id)},
        createNew: async (fields) => {return this.createNew('Playlist', fields)},
    }
}

module.exports = DatabaseManager