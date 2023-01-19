import { Sequelize } from "sequelize";

const db = new Sequelize('s48311_pelayanan_publik', 'u48311_6Ta0PkbOag', '+@4gj4wQCvA4l5dfVqh5e@z0',{
    host: 'beta.optiklink.com',
    dialect: "mysql",
    timezone: '+07:00'
});

export default db;