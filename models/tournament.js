import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

const Tournament = sequelize.define("Tournament", {
    title: DataTypes.STRING,
    gameType: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    rules: DataTypes.TEXT
});

export default Tournament;
