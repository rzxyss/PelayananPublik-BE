import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Program = db.define('tbl_program',{
    judul_program: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    createdAt: {
        type: DataTypes.DATEONLY,
    },
    updatedAt: {
        type: DataTypes.DATEONLY,
    }
},{
    freezeTableName: true
});

export default Program;

(async()=>{
    await db.sync();
})();