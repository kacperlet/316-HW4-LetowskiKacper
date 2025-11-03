import { beforeAll, beforeEach, afterEach, afterAll, expect, test } from 'vitest';
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose')

let db = null;

/**
 * Vitest test script for the Playlister app's Mongo Database Manager. Testing should verify that the Mongo Database Manager 
 * will perform all necessarily operations properly.
 *  
 * Scenarios we will test:
 *  1) Reading a User from the database
 *  2) Creating a User in the database
 *  3) ...
 * 
 * You should add at least one test for each database interaction. In the real world of course we would do many varied
 * tests for each interaction.
 */

/**
 * Executed once before all tests are performed.
 */
beforeAll(async () => {
    // SETUP THE CONNECTION VIA MONGOOSE JUST ONCE - IT IS IMPORTANT TO NOTE THAT INSTEAD
    // OF DOING THIS HERE, IT SHOULD BE DONE INSIDE YOUR Database Manager (WHICHEVER)
    
    db = require("../db/");

    // RESET DATABASE
    if (process.env.SELECTED_DB === "mongo")
    {
        console.log("RESETTING MONGO");
        const confirmation = require("../test/data/mongo");
        await confirmation;
    }
    else
    {
        console.log("RESETTING POSTGRE");
        const confirmation = require("../test/data/postgre");
        await confirmation;
    }
    
});

/**
 * Executed before each test is performed.
 */
beforeEach(() => {
});

/**
 * Executed after each test is performed.
 */
afterEach(() => {
});

/**
 * Executed once after all tests are performed.
 */
afterAll(() => {
});

/**
 * Vitest test to see if the Database Manager can get a User.
 */
test('Test #1) Reading a User from the Database', async () => {
    // FILL IN A USER WITH THE DATA YOU EXPECT THEM TO HAVE
    const expectedUser = {
        firstName: "Joe",
        lastName: "Shmo"
    };

    // READ THE USER
    const actualUser = await db.User.getOne(expectedUser);

    expect(actualUser).not.toBeNull();
    expect(actualUser.firstName).toBe(expectedUser.firstName);
    expect(actualUser.lastName).toBe(expectedUser.lastName);
});

/**
 * Vitest test to see if the Database Manager can create a User
 */
test('Test #2) Creating a User in the Database', async () => {
    // MAKE A TEST USER TO CREATE IN THE DATABASE
    const testUser = {
        firstName: "Test",
        lastName: "User",
        email: "test@user.com",
        passwordHash: "$2a$10$dPEwsAVi1ojv2RfxxTpZjuKSAbep7zEKb5myegm.ATbQ4sJk4agGu" // aaaaaaaa
    };

    // CREATE THE USER
    const create = await db.User.createNew(testUser);
    expect(create).not.toBeNull();

    // NEXT TEST TO SEE IF IT WAS PROPERLY CREATED

    // FILL IN A USER WITH THE DATA YOU EXPECT THEM TO HAVE
    const expectedUser = {
        firstName: "Test",
        lastName: "User",
        email: "test@user.com",
        passwordHash: "$2a$10$dPEwsAVi1ojv2RfxxTpZjuKSAbep7zEKb5myegm.ATbQ4sJk4agGu"
    };

    // READ THE USER
    const actualUser = await db.User.getOne({firstName: "Test", lastName: "User"});

    // COMPARE THE VALUES OF THE EXPECTED USER TO THE ACTUAL ONE
    expect(actualUser.firstName).toBe(expectedUser.firstName);
    expect(actualUser.lastName).toBe(expectedUser.lastName);
    expect(actualUser.email).toBe(expectedUser.email);
});

// THE REST OF YOUR TEST SHOULD BE PUT BELOW
test('Test #3) Updating a User from the Database', async () => {
    // MAKE A TEST USER TO CREATE IN THE DATABASE
    const testUser = {
        firstName: "Funny",
        lastName: "Guy",
        email: "funny@guy.com",
        passwordHash: "$2a$10$dPEwsAVi1ojv2RfxxTpZjuKSAbep7zEKb5myegm.ATbQ4sJk4agGu" // aaaaaaaa
    };

    // CREATE THE USER
    const createdUser = await db.User.createNew(testUser);
    expect(createdUser).not.toBeNull();

    // UPDATE THE USER
    await db.User.updateById(createdUser._id, {lastName: "Person"});

    // READ THE USER
    const actualUser = await db.User.getOneById(createdUser._id);

    // COMPARE THE VALUES OF THE EXPECTED USER TO THE ACTUAL ONE
    expect(actualUser.firstName).toBe("Funny");
    expect(actualUser.lastName).toBe("Person");
});

test('Test #4) Deleting a User from the Database', async () => {
    // MAKE A TEST USER TO CREATE IN THE DATABASE
    const testUser = {
        firstName: "Steve",
        lastName: "Jobs",
        email: "steve@jobs.com",
        passwordHash: "$2a$10$dPEwsAVi1ojv2RfxxTpZjuKSAbep7zEKb5myegm.ATbQ4sJk4agGu" // aaaaaaaa
    };

    // CREATE THE USER
    const createdUser = await db.User.createNew(testUser);
    expect(createdUser).not.toBeNull();

    // DELETE THE USER
    await db.User.deleteById(createdUser._id);

    // READ THE USER
    const actualUser = await db.User.getOneById(createdUser._id);

    // EXPECT NULL
    expect(actualUser).toBeNull();
});

test('Test #5) Reading a Playlist from the Database', async () => {
    // FILL IN A USER WITH THE DATA YOU EXPECT THEM TO HAVE
    const expectedPlaylist = {
        name: "Spacey",
        ownerEmail: "joe@shmo.com"
    };

    // READ THE PLAYLIST
    const actualPlaylist = await db.Playlist.getOne(expectedPlaylist);

    expect(actualPlaylist).not.toBeNull();
    expect(actualPlaylist.name).toBe(expectedPlaylist.name);
    expect(actualPlaylist.ownerEmail).toBe(expectedPlaylist.ownerEmail);
});

test('Test #6) Creating a Playlist in the Database', async () => {
    // MAKE A TEST USER TO CREATE IN THE DATABASE
    const testPlaylist = {
        name: "Groovy",
        ownerEmail: "joe@shmo.com",
        songs: []
    };

    // CREATE THE PLAYLIST
    const create = await db.Playlist.createNew(testPlaylist);
    expect(create).not.toBeNull();

    // FILL IN A PLAYLIST WITH THE DATA YOU EXPECT IT TO HAVE
    const expectedPlaylist = {
        name: "Groovy",
        ownerEmail: "joe@shmo.com"
    };

    // READ THE PLAYLIST
    const actualPlaylist = await db.Playlist.getOne(expectedPlaylist);

    // COMPARE THE VALUES OF THE EXPECTED USER TO THE ACTUAL ONE
    expect(actualPlaylist.name).toBe(expectedPlaylist.name);
    expect(actualPlaylist.ownerEmail).toBe(expectedPlaylist.ownerEmail);
});

test('Test #7) Updating a Playlist from the Database', async () => {
    // MAKE A TEST PLAYLIST TO CREATE IN THE DATABASE
    const testPlaylist = {
        name: "Jazz Music",
        ownerEmail: "joe@shmo.com",
        songs: []
    };

    // CREATE THE PLAYLIST
    const createdPlaylist = await db.Playlist.createNew(testPlaylist);
    expect(createdPlaylist).not.toBeNull();

    // UPDATE THE PLAYLIST
    await db.Playlist.updateById(createdPlaylist._id, {name: "Rock Music"});

    // READ THE UPDATED PLAYLIST
    const actualPlaylist = await db.Playlist.getOneById(createdPlaylist._id);

    // COMPARE THE VALUES OF THE EXPECTED PLAYLIST TO THE ACTUAL ONE
    expect(actualPlaylist.name).toBe("Rock Music");
    expect(actualPlaylist.ownerEmail).toBe("joe@shmo.com");
});

test('Test #8) Deleting a Playlist from the Database', async () => {
    // MAKE A TEST PLAYLIST TO CREATE IN THE DATABASE
    const testPlaylist = {
        name: "Classical",
        ownerEmail: "jane@doe.com",
        songs: []
    };

    // CREATE THE PLAYLIST
    const createdPlaylist = await db.Playlist.createNew(testPlaylist);
    expect(createdPlaylist).not.toBeNull();

    // DELETE THE PLAYLIST
    await db.Playlist.deleteById(createdPlaylist._id);

    // READ THE PLAYLIST
    const actualPlaylist = await db.Playlist.getOneById(createdPlaylist._id);

    // EXPECT NULL
    expect(actualPlaylist).toBeNull();
});

test('Test #9) Getting Multiple Users from the Database', async () => {
    const lastNames = ['Alpha', 'Beta', 'Charlie', 'Delta'];
    
    for (let i = 0; i < lastNames.length; i++)
    {
        const user = {
            firstName: "Robert",
            lastName: lastNames[i],
            email: `robert@${lastNames[i]}.com`,
            passwordHash: "$2a$10$dPEwsAVi1ojv2RfxxTpZjuKSAbep7zEKb5myegm.ATbQ4sJk4agGu" // aaaaaaaa
        }

        await db.User.createNew(user);
    }

    // QUERY FOR ALL USERS FITTING QUERY
    const users = await db.User.getAll({firstName: "Robert"});

    expect(users.length).toBeGreaterThanOrEqual(lastNames.length);
    for (let i = 0; i < users.length; i++)
    {
        expect(users[i].firstName).toBe("Robert");
    }
});

test('Test #10) Getting Multiple Playlists from the Database', async () => {
    const listNames = ['Jazz', 'Rock', 'Pop', 'Rap'];
    
    for (let i = 0; i < listNames.length; i++)
    {
        const list = {
            name: listNames[i],
            ownerEmail: "joe@shmo.com",
            songs: []
        }

        await db.Playlist.createNew(list);
    }

    // QUERY FOR ALL LISTS FITTING QUERY
    const lists = await db.Playlist.getAll({ownerEmail: "joe@shmo.com"});

    expect(lists.length).toBeGreaterThanOrEqual(listNames.length);
    for (let i = 0; i < lists.length; i++)
    {
        expect(lists[i].ownerEmail).toBe("joe@shmo.com");
    }
});