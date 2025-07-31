import Team from "../../models/team.js";

// 🟢 Criar time
async function createTeam(req, res) {
    try {
        await Team.create({
            name: req.body.name,
            region: req.body.region,
            foundedYear: req.body.foundedYear,
            logoUrl: req.body.logoUrl
        });

        res.render('alerts', { title: 'Times', body: 'Time criado com sucesso.' });
    } catch (error) {
        res.render('alerts', { title: 'Erro', body: 'Erro ao criar time.' });
    }
}

// 📋 Listar times
async function listTeams(req, res) {
    try {
        const list = await Team.findAll({ raw: true });
        res.render('teams/teams', { teams: list });
    } catch (error) {
        res.render('alerts', { title: 'Erro', body: 'Erro ao listar times.' });
    }
}

// ✏️ Editar time
async function editTeam(req, res) {
    try {
        const team = await Team.findOne({ where: { id: req.body.id } });

        if (!team) {
            return res.render('alerts', { title: 'Erro', body: 'Time não encontrado.' });
        }

        res.render('teams/teams', {
            action: 'edit',
            team_editing: team.dataValues
        });
    } catch (error) {
        res.render('alerts', { title: 'Erro', body: 'Erro ao carregar time.' });
    }
}

// 💾 Salvar alterações no time
async function saveTeam(req, res) {
    try {
        const team = await Team.findOne({ where: { id: req.body.id } });

        if (!team) {
            return res.render('alerts', { title: 'Erro', body: 'Time não encontrado.' });
        }

        team.name = req.body.name;
        team.region = req.body.region;
        team.foundedYear = req.body.foundedYear;
        team.logoUrl = req.body.logoUrl;

        await team.save();

        res.render('alerts', { title: 'Times', body: 'Time editado com sucesso.' });
    } catch (error) {
        res.render('alerts', { title: 'Erro', body: 'Erro ao editar time.' });
    }
}

// 🗑️ Deletar time
async function deleteTeam(req, res) {
    try {
        const team = await Team.findOne({ where: { id: req.body.id } });

        if (!team) {
            return res.render('alerts', { title: 'Erro', body: 'Time não encontrado.' });
        }

        await team.destroy();

        res.render('alerts', { title: 'Times', body: 'Time deletado com sucesso.' });
    } catch (error) {
        res.render('alerts', { title: 'Erro', body: 'Erro ao deletar time.' });
    }
}

export { createTeam, listTeams, editTeam, saveTeam, deleteTeam };
