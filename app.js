import express from 'express';
import { create } from 'express-handlebars';
//import player_router from './routers/api/player_router.js';
//import tournament_router from './routers/api/tournament_router.js';
//import match_router from './routers/api/match_router.js';
//import team_router from './routers/api/team_router.js';
import syncer from './database/syncer.js';
import player_web_router from './routers/web/player_web_router.js';
import matches_web_router from './routers/web/match_web_router.js';
import css from 'connect-session-sequelize';
import session from 'express-session';
import { checkLogged } from './controllers/web/user_web_controller.js';
import user_web_router from './routers/web/user_router.js';
import sequelize from './database/mysql.js';
import team_web_router from './routers/web/team_web_router.js';
import tournament_web_router from './routers/web/tournament_web_router.js';


if (!await syncer()) {
    process.exit();
}

const app = express();
const hbs = create({
    extname: '.handlebars',
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/',
    partialsDir: 'views/partials/'
});

const SequelizeStore = css(session.Store);

const sequelizeStore = new SequelizeStore({
    db: sequelize,
    tableName: 'sessions',
    checkExpirationInterval: 5 * 60 * 1000,
    expiration: 1 * 60 * 60 * 1000 
});

app.use(session({
    secret: '*&long+and+secure+secret=%445',
    name: 'sess_cookie_param',
    store: sequelizeStore,
    cookie: {
        maxAge: 1 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true
    },
    saveUninitialized: false, 
    resave: false
}));

await sequelizeStore.sync();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded());
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});


app.use('/players', checkLogged, player_web_router);
app.use('/tournaments', checkLogged, tournament_web_router);
app.use('/matches', checkLogged, matches_web_router);
app.use('/teams', checkLogged, team_web_router);
app.use('/users', user_web_router);


app.listen(8080, () => {
    console.log('Escutando na porta 8080...');
});
