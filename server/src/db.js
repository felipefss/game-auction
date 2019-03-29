const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017';
const dbName = 'local';
const client = MongoClient(url, { useNewUrlParser: true });

function createUser(name) {
    const playerData = {
        name,
        coins: 1000,
        inventory: {
            breads: 30,
            carrots: 18,
            diamonds: 1
        }
    };
    return _newEntry('player', playerData);
}

function getUser(name) {
    return _get('player', { name });
}

function updateUser(name, data) {
    return _updateEntry('player', { name }, data);
}

/**
 * 
 * @param {String} collection - Name of the collection
 * @param {Object} payload - A JSON object with the data to be inserted
 */
async function _newEntry(collection, payload) {
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
 * 
 * @param {String} collection - Name of collection
 * @param {Object} payload - The object to retrieve
 */
async function _get(collection, payload) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const coll = db.collection(collection);

        let user = await coll.findOne(payload);
        return user;
    } catch (err) {
        throw err.errmsg;
    } finally {
        client.close();
    }
}

/**
 * 
 * @param {String} collection - Name of collection
 * @param {Object} query - The key/value pair of the object to update
 * @param {Object} payload - JSON ojbect with data to be updated
 */
async function _updateEntry(collection, query, payload) {
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
