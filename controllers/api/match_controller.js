import Match from "../../models/match.js";
import Tournament from "../../models/tournament.js";

async function createMatch(req, res) {
    try {
        // Busca o torneio pelo ID
        const tournament = await Tournament.findByPk(req.body.tournamentId);
        if (!tournament) {
            return res.status(404).json({ message: "Torneio não encontrado." });
        }

        // Cria a partida associada ao torneio
        const match = await Match.create({
            scheduledDate: req.body.scheduledDate,
            result: req.body.result,
            TournamentId: tournament.id
        });

        res.json(match);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar partida.", error: error.message });
    }
}

async function listMatches(req, res) {
    try {
        const list = await Match.findAll({ include: Tournament });
        res.json(list);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar partidas.", error: error.message });
    }
}

async function editMatch(req, res) {
    try {
        const match = await Match.findOne({ where: { id: req.body.id } });
        if (!match) {
            return res.status(404).json({ message: "Partida não encontrada." });
        }

        match.scheduledDate = req.body.scheduledDate;
        match.result = req.body.result;
        await match.save();

        res.json({ message: "Partida atualizada com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao editar partida.", error: error.message });
    }
}

async function deleteMatch(req, res) {
    try {
        const match = await Match.findOne({ where: { id: req.body.id } });
        if (!match) {
            return res.status(404).json({ message: "Partida não encontrada." });
        }

        await match.destroy();
        res.json({ message: "Partida removida com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover partida.", error: error.message });
    }
}

export { createMatch, listMatches, editMatch, deleteMatch };
