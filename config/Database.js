import { Sequelize } from "sequelize";

const db = new Sequelize('pelayanan_publik', 'root', 'tikomdikceria',{
    host: 'localhost',
    dialect: "mysql",
    timezone: '+07:00'
});

export default db;