const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017';
const dbName = 'local';
const client = MongoClient(url, { useNewUrlParser: true });

async function createUser(name) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const coll = db.collection('player');

        let r = await coll.insertOne({
            name,
            coins: 1000,
            inventory: {
                breads: 30,
                carrots: 18,
                diamonds: 1
            }
        });
        assert.strictEqual(r.insertedCount, 1);
    } catch(err) {
        throw err.errmsg;
    } finally {
        client.close();
    }
}

async function getUser(name) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const coll = db.collection('player');

        let user = await coll.findOne({ name });
        return user;
    } catch (err) {
        throw err.errmsg;
    } finally {
        client.close();
    }
}

async function updateUser(name, data) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const coll = db.collection('player');

        let r = await coll.updateOne({ name }, { $set: data });
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
