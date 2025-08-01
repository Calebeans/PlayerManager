import { Sequelize } from "sequelize";

//const sequelize = new Sequelize({
//    dialect: 'mysql',
//    host: 'localhost',
//    port: '3306',
//    username: 'root',
//    password: "Assembleia12345!@#$%",
//    database: 'trabalho_node'
//});
//export async function syncer() {
//    try {
//        await sequelize.authenticate();
//         sequelize.sync();
//    } catch (error) {
//        console.log('Erro ao acessar a base de dados.');
//        return false;
//    }
//    return true;
//}

const sequelize = new Sequelize('postgresql://trabalho_web_user:2MsrJZGyyOgNRn7kQ0M7gexlkUCUU2Rn@dpg-d261d77fte5s73e4ou10-a/trabalho_web_bd');

export default sequelize;