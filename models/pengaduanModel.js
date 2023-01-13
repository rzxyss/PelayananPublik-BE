import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Pengaduan = db.define('tbl_pengaduan',{
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    judul_pengaduan: DataTypes.STRING,
    isi_pengaduan: DataTypes.TEXT,
    createdAt: {
        type: DataTypes.DATEONLY,
    },
    updatedAt: {
        type: DataTypes.DATEONLY,
    }
},{
    freezeTableName: true
});

export default Pengaduan;

(async()=>{
    await db.sync();
})();