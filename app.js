import express from 'express';
import { create } from 'express-handlebars';
//import player_router from './routers/api/player_router.js';
import tournament_router from './routers/api/tournament_router.js';
//import match_router from './routers/api/match_router.js';
import team_router from './routers/api/team_router.js';
import syncer from './database/syncer.js';
import player_web_router from './routers/web/player_web_router.js';
import matches_web_router from './routers/web/match_web_router.js';

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

app.use(express.json());
app.use(express.urlencoded());
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.end('Home');
});

app.use('/players', player_web_router);
app.use('/tournament', tournament_router);
app.use('/matches', matches_web_router);
app.use('/team', team_router);

app.listen(8080, () => {
    console.log('Escutando na porta 8080...');
});
