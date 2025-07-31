import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

const Team = sequelize.define('Team', {
    name: DataTypes.STRING,
    region: DataTypes.STRING,
    foundedYear: DataTypes.INTEGER,
    logoUrl: DataTypes.STRING
});

export default Team;
