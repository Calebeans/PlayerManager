import Player from "../models/player.js";
import Team from "../models/team.js";
import Tournament from "../models/tournament.js";
import Match from "../models/match.js";
import sequelize from "./mysql.js";

async function syncer() {
    try {
        await sequelize.authenticate();

        Player.belongsTo(Team);
        Team.hasMany(Player);

        Match.belongsTo(Tournament);
        Tournament.hasMany(Match);

        await sequelize.sync();

        return true;
    } catch (error) {
        console.error("Erro ao sincronizar com o banco:", error.message);
        return false;
    }
}

export default syncer;
