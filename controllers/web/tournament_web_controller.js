import Tournament from "../../models/tournament.js";

async function createTournament(req, res) {
    try {
        await Tournament.create({
            title: req.body.title,
            gameType: req.body.gameType,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            rules: req.body.rules
        });

        res.render('alerts', { title: 'Torneios', body: 'Torneio criado com sucesso.' });
    } catch (error) {
        res.render('alerts', { title: 'Erro', body: 'Erro ao criar torneio.' });
    }
}

async function listTournaments(req, res) {
    try {
        const list = await Tournament.findAll({ raw: true });
        res.render('tournaments/tournaments', { tournaments: list });
    } catch (error) {
        res.render('alerts', { title: 'Erro', body: 'Erro ao listar torneios.' });
    }
}

async function editTournament(req, res) {
    try {
        const tournament = await Tournament.findOne({ where: { id: req.body.id } });

        if (!tournament) {
            return res.render('alerts', { title: 'Erro', body: 'Torneio não encontrado.' });
        }

        res.render('tournaments/tournaments', {
            action: 'edit',
            tournament_editing: tournament.dataValues
        });
    } catch (error) {
        res.render('alerts', { title: 'Erro', body: 'Erro ao carregar torneio.' });
    }
}

async function saveTournament(req, res) {
    try {
        const tournament = await Tournament.findOne({ where: { id: req.body.id } });

        if (!tournament) {
            return res.render('alerts', { title: 'Erro', body: 'Torneio não encontrado.' });
        }

        tournament.title = req.body.title;
        tournament.gameType = req.body.gameType;
        tournament.startDate = req.body.startDate;
        tournament.endDate = req.body.endDate;
        tournament.rules = req.body.rules;

        await tournament.save();

        res.render('alerts', { title: 'Torneios', body: 'Torneio editado com sucesso.' });
    } catch (error) {
        res.render('alerts', { title: 'Erro', body: 'Erro ao editar torneio.' });
    }
}

async function deleteTournament(req, res) {
    try {
        const tournament = await Tournament.findOne({ where: { id: req.body.id } });

        if (!tournament) {
            return res.render('alerts', { title: 'Erro', body: 'Torneio não encontrado.' });
        }

        await tournament.destroy();

        res.render('alerts', { title: 'Torneios', body: 'Torneio deletado com sucesso.' });
    } catch (error) {
        res.render('alerts', { title: 'Erro', body: 'Erro ao deletar torneio.' });
    }
}

export {createTournament, listTournaments, editTournament, saveTournament, deleteTournament};
