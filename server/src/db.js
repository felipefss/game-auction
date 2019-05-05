const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017';
const dbName = 'local';

/**
 * Inserts a new user in the database.
 * 
 * @param {String} name - Name of the user to be created
 * @param {String} sessionId - ID of the current browser session
 * @returns {Promise}
 */
function createUser(name, sessionId) {
    const playerData = {
        name,
        sessionId,
        coins: 1000,
        inventory: {
            breads: 30,
            carrots: 18,
            diamonds: 1
        }
    };
    return _newEntry('player', playerData);
}

/**
 * Retrieves a given user from the database, if existent.
 * 
 * @param {String} name - Name of the user to be retrieved
 * @returns {Promise} - A promise with the retrieved user object.
 */
function getUser(name) {
    return _get('player', { name });
}

/**
 * Updates a user in the database.
 * @param {String} name - Name of the user to be updated
 * @param {Object} data - Data to be updated.
 * @returns {Promise}
 */
function updateUser(name, data) {
    return _updateEntry('player', { name }, data);
}

/**
 * Inserts a new entry in the database.
 * 
 * @param {String} collection - Name of the collection
 * @param {Object} payload - A JSON object with the data to be inserted
 * @returns {Promise}
 */
async function _newEntry(collection, payload) {
    const client = new MongoClient(url, { useNewUrlParser: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const coll = db.collection(collection);

        let r = await coll.insertOne(payload);
        assert.strictEqual(r.insertedCount, 1);
    } catch (err) {
        throw err.errmsg;
    } finally {
        client.close();
    }
}

/**
 * Retrieves an entry from the database.
 * 
 * @param {String} collection - Name of collection
 * @param {Object} payload - The object to retrieve
 * @returns {Promise} - A promise with the desired object.
 */
async function _get(collection, payload) {
    const client = new MongoClient(url, { useNewUrlParser: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const coll = db.collection(collection);

        let entry = await coll.findOne(payload);
        return entry;
    } catch (err) {
        throw err.errmsg;
    } finally {
        client.close();
    }
}

/**
 * Updates an entry in the database.
 * 
 * @param {String} collection - Name of collection
 * @param {Object} query - The key/value pair of the object to update
 * @param {Object} payload - JSON ojbect with data to be updated
 * @returns {Promise}
 */
async function _updateEntry(collection, query, payload) {
    const client = new MongoClient(url, { useNewUrlParser: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const coll = db.collection(collection);

        let r = await coll.updateOne(query, { $set: payload });
        assert.strictEqual(r.modifiedCount, 1);
    } catch (err) {
        throw err.errmsg;
    } finally {
        client.close();
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser
};
