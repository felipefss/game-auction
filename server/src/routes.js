module.exports = (server) => {
    const bodyParser = require('body-parser');
    const db = require('./db');
    const manager = require('./auctionManager')(server);
    const router = require('express').Router();
    const session = require('express-session');
    // const MongoDBStore = require('connect-mongodb-session')(session);

    // const store = new MongoDBStore({
    //     uri: 'mongodb://localhost:27017',
    //     databaseName: 'local',
    //     collection: 'sessions'
    // });

    // // Catch errors
    // store.on('error', function (error) {
    //     console.error(error);
    // });

    /**
     * Returns true if current session ID matches stored session ID; false otherwise.
     * @param {Object} user - User object stored in DB
     * @param {String} currentSession - Current session ID
     */
    function isValidSession(user, currentSession) {
        return user.sessionId == currentSession;
    }

    router.use(bodyParser.json());
    router.use(session({
        secret: 'speaknoevil',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        },
        // store: store,
        resave: true,
        saveUninitialized: true
    }));

    // TODO: passar a SessionID em todo REST.
    // Se tiver sido destroyed, ir pra tela de login
    router.post('/login', async (req, res) => {
        const userName = req.body.user;

        try {
            let user = await db.getUser(userName);
            if (!user) {
                await db.createUser(userName, req.sessionID);
            } else {
                req.session.regenerate(err => {
                    db.updateUser(userName, { sessionId: req.sessionID });
                });
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

    });

    // module.exports = router;
    return router;
};
