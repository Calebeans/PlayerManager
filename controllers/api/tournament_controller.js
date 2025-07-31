import Tournament from "../../models/tournament.js";

async function createTournament(req, res) {
    const tournament = await Tournament.create({
        title: req.body.title,
        gameType: req.body.gameType,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        rules: req.body.rules
    });

    res.json(tournament);
}

async function listTournaments(req, res) {
    const list = await Tournament.findAll();
    res.json(list);
}

async function editTournament(req, res) {
    const tournament = await Tournament.findByPk(req.body.id);
    if (!tournament) return res.status(404).json({ message: "Torneio não encontrado." });

    tournament.title = req.body.title;
    tournament.gameType = req.body.gameType;
    tournament.startDate = req.body.startDate;
    tournament.endDate = req.body.endDate;
    tournament.rules = req.body.rules;
    await tournament.save();

    res.json({ message: "Torneio atualizado com sucesso." });
}

async function deleteTournament(req, res) {
    const tournament = await Tournament.findByPk(req.body.id);
    if (!tournament) return res.status(404).json({ message: "Torneio não encontrado." });

    await tournament.destroy();
    res.json({ message: "Torneio removido com sucesso." });
}

export { createTournament, listTournaments, editTournament, deleteTournament };
