import Team from "../../models/team.js";

async function createTeam(req, res) {
    const team = await Team.create({
        name: req.body.name,
        region: req.body.region,
        foundedYear: req.body.foundedYear,
        logoUrl: req.body.logoUrl
    });

    res.json(team);
}

async function listTeams(req, res) {
    const list = await Team.findAll();
    res.json(list);
}

async function editTeam(req, res) {
    const team = await Team.findByPk(req.body.id);
    if (!team) return res.status(404).json({ message: "Time não encontrado." });

    team.name = req.body.name;
    team.region = req.body.region;
    team.foundedYear = req.body.foundedYear;
    team.logoUrl = req.body.logoUrl;
    await team.save();

    res.json({ message: "Time atualizado com sucesso." });
}

async function deleteTeam(req, res) {
    const team = await Team.findByPk(req.body.id);
    if (!team) return res.status(404).json({ message: "Time não encontrado." });

    await team.destroy();
    res.json({ message: "Time removido com sucesso." });
}

export { createTeam, listTeams, editTeam, deleteTeam };
