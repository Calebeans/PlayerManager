import Player from "../../models/player.js";
import Team from "../../models/team.js";

// Criar jogador
async function createPlayer(req, res) {
    const player = await Player.create({
        name: req.body.name,
        age: req.body.age,
        position: req.body.position,
        TeamId: req.body.TeamId
    });

    res.render('alerts', { title: 'Jogadores', body: 'Jogador criado.' });
}

// Listar jogadores
async function listPlayers(req, res) {
    const list = await Player.findAll({ include: [Team], raw: true });
    res.render('players/players', { players: list });
}

// Editar jogador
async function editPlayer(req, res) {
    const player = await Player.findOne({ where: { id: req.body.id } });
    res.render('players/players', { action: 'edit', player_editing: player.dataValues });
}

// Salvar edição
async function savePlayer(req, res) {
    const player = await Player.findOne({ where: { id: req.body.id } });

    player.name = req.body.name;
    player.age = req.body.age;
    player.position = req.body.position;
    player.TeamId = req.body.TeamId;

    await player.save();

    res.render('alerts', { title: 'Jogadores', body: 'Jogador editado.' });
}

// Deletar jogador
async function deletePlayer(req, res) {
    const player = await Player.findOne({ where: { id: req.body.id } });
    await player.destroy();

    res.render('alerts', { title: 'Jogadores', body: 'Jogador deletado.' });
}

export { createPlayer, listPlayers, editPlayer, savePlayer, deletePlayer };
