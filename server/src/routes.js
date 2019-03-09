const router = require('express').Router();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017',
    databaseName: 'local',
    collection: 'sessions'
});

// Catch errors
store.on('error', function (error) {
    console.error(error);
});

router.use(session({
    secret: 'speaknoevil',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));

// TODO: passar a SessionID em todo REST.
// Se tiver sido destroyed, ir pra tela de login
router.get('/', function (req, res) {
    // store.get(req.sessionID, (err, sess) => {
    //     if (err) throw err;

    //     if (sess) {
    //         req.session.destroy(err => {
    //             if (err) throw err;
    //             res.send('Session destroyed');
    //         });
    //     } else {
    //         res.send('Hello ' + JSON.stringify(req.sessionID));
    //     }
    // });
});

router.post('/login', (req, res) => {
    console.log(`session: ${req.sessionID}`);
});

module.exports = router;