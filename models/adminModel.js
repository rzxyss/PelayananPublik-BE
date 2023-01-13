import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Admin = db.define('tbl_admin', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: {
        type: DataTypes.DATEONLY,
    },
    updatedAt: {
        type: DataTypes.DATEONLY,
    }
}, {
    freezeTableName: true
});

export default Admin;

(async () => {
    await db.sync();
})();