import { Sequelize } from "sequelize";

const db = new Sequelize('railway', 'root', '7PLKSkE9n8mKbxBTKlJM',{
    host: 'containers-us-west-164.railway.app',
    port: 6320,
    dialect: "mysql",
    timezone: '+07:00'
});

export default db;