import Player from "../../models/player.js";
import Team from "../../models/team.js";

async function createPlayer(req, res) {
    const player = await Player.create({
        name: req.body.name,
        age: req.body.age,
        nickname: req.body.nickname,
        favoriteGame: req.body.favoriteGame,
        position: req.body.position,
        TeamId: req.body.TeamId
    });

    res.render('alerts', { title: 'Jogadores', body: 'Jogador criado.' });
}

async function listPlayers(req, res) {
    const list = await Player.findAll({ include: [Team]});
    const list_processed = list.map((i) => { return i.toJSON() });
    const teams = await Team.findAll({raw: true});
    res.render('players/players', { players: list_processed, teams: teams });
}

async function editPlayer(req, res) {
    const player = await Player.findOne({ where: { id: req.body.id } });
    if(!player) {
        return res.render('alerts', {title: 'Jogadores', body: 'Jogador não encontrado.'});
    }
    const teams = await Team.findAll({raw:true});
    const player_editing = player.toJSON();
    res.render('players/players', { action: 'edit', player_editing: player_editing, teams:teams });
}

async function savePlayer(req, res) {
    const player = await Player.findOne({ where: { id: req.body.id } });

    player.name = req.body.name;
    player.age = req.body.age;
    player.favoriteGame = req.body.favoriteGame;
    player.nickname = req.body.nickname;
    player.position = req.body.position;
    player.TeamId = req.body.TeamId;

    await player.save();

    res.render('alerts', { title: 'Jogadores', body: 'Jogador editado.' });
}

async function deletePlayer(req, res) {
    const player = await Player.findOne({ where: { id: req.body.id } });
    await player.destroy();

    res.render('alerts', { title: 'Jogadores', body: 'Jogador deletado.' });
}

export { createPlayer, listPlayers, editPlayer, savePlayer, deletePlayer };
