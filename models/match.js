import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

const Match = sequelize.define("Match", {
    scheduledDate: DataTypes.STRING,
    result: DataTypes.STRING
});

export default Match;
