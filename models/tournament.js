import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

const Tournament = sequelize.define("Tournament", {
    title: DataTypes.STRING,
    gameType: DataTypes.STRING,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    rules: DataTypes.TEXT
});

export default Tournament;
