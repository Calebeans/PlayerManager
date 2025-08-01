import Match from "../../models/match.js";
import Tournament from "../../models/tournament.js";

async function createMatch(req, res) {
    const tournament = await Tournament.findByPk(req.body.TournamentId);
    if (!tournament) {
        return res.render('alerts', { title: 'Partidas', body: 'Torneio não encontrado.' });
    }

    await Match.create({
        scheduledDate: req.body.scheduledDate,
        result: req.body.result,
        TournamentId: tournament.id
    });

    res.render('alerts', { title: 'Partidas', body: 'Partida criada.' });
}

async function listMatches(req, res) {
    const list = await Match.findAll({ include: [Tournament]});
    const list_processed = list.map((match) => { return match.toJSON() });
    const tournaments = await Tournament.findAll({raw:true});
    res.render('matches/matches', { matches: list_processed, tournaments: tournaments });
}

async function editMatch(req, res) {
    const match = await Match.findOne({ where: { id: req.body.id }, include: Tournament });    
    if (!match) {
        return res.render('alerts', { title: 'Partidas', body: 'Partida não encontrada.' });
    }
    const tournaments = await Tournament.findAll({raw:true});
    const match_editing = match.toJSON();
    res.render('matches/matches', { action: 'edit', match_editing: match_editing, tournaments: tournaments });
}

async function saveMatch(req, res) {
    const match = await Match.findOne({ where: { id: req.body.id } });
    if (!match) {
        return res.render('alerts', { title: 'Partidas', body: 'Partida não encontrada.' });
    }

    match.scheduledDate = req.body.scheduledDate;
    match.result = req.body.result;
    match.TournamentId = req.body.TournamentId;

    await match.save();

    res.render('alerts', { title: 'Partidas', body: 'Partida editada.' });
}

async function deleteMatch(req, res) {
    const match = await Match.findOne({ where: { id: req.body.id } });
    if (!match) {
        return res.render('alerts', { title: 'Partidas', body: 'Partida não encontrada.' });
    }

    await match.destroy();
    res.render('alerts', { title: 'Partidas', body: 'Partida deletada.' });
}

export { createMatch, listMatches, editMatch, saveMatch, deleteMatch };
