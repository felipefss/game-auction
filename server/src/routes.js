module.exports = (server) => {
    const bodyParser = require('body-parser');
    const db = require('./db');
    const manager = require('./auctionManager')(server);
    const router = require('express').Router();

    router.use(bodyParser.json());

    router.post('/login', async (req, res) => {
        const userName = req.body.user;

        try {
            let user = await db.getUser(userName);
            if (!user) {
                await db.createUser(userName);
            }
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(500);
        }
    });

    router.get('/getUser/:userId', (req, res) => {
        db.getUser(req.params.userId)
            .then(user => res.send(user))
            .catch(() => res.sendStatus(500));
    });

    router.post('/newAuction', (req, res) => {
        manager.newAuction(req.body);
        res.sendStatus(200);
    });

    return router;
};
