import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Komentar = db.define('tbl_komentar',{
    id_pengaduan: DataTypes.INTEGER,
    email: DataTypes.STRING,
    isi_komentar: DataTypes.STRING,
    createdAt: {
        type: DataTypes.DATEONLY,
    },
    updatedAt: {
        type: DataTypes.DATEONLY,
    }
},{
    freezeTableName: true
});

export default Komentar;

(async()=>{
    await db.sync();
})();