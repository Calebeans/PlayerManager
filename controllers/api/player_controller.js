import Player from "../../models/player.js";
import Team from "../../models/team.js";

async function createPlayer(req, res) {
    const team = await Team.findByPk(req.body.teamId);
    if (!team) return res.status(404).json({ message: "Time não encontrado." });

    const player = await Player.create({
        name: req.body.name,
        nickname: req.body.nickname,
        age: req.body.age,
        favoriteGame: req.body.favoriteGame,
        TeamId: team.id
    });

    res.json(player);
}

async function listPlayers(req, res) {
    const list = await Player.findAll({ include: Team });
    res.json(list);
}

async function editPlayer(req, res) {
    const player = await Player.findByPk(req.body.id);
    if (!player) return res.status(404).json({ message: "Jogador não encontrado." });

    player.name = req.body.name;
    player.nickname = req.body.nickname;
    player.age = req.body.age;
    player.favoriteGame = req.body.favoriteGame;
    await player.save();

    res.json({ message: "Jogador atualizado com sucesso." });
}

async function deletePlayer(req, res) {
    const player = await Player.findByPk(req.body.id);
    if (!player) return res.status(404).json({ message: "Jogador não encontrado." });

    await player.destroy();
    res.json({ message: "Jogador removido com sucesso." });
}

export { createPlayer, listPlayers, editPlayer, deletePlayer };
