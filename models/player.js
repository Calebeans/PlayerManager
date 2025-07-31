import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";
import Team from "./team.js";

const Player = sequelize.define('Player', {
    name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    age: DataTypes.INTEGER,
    favoriteGame: DataTypes.STRING
});

Player.belongsTo(Team);

export default Player;