import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Laporan = db.define('data_laporan',{
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    jenis_laporan: DataTypes.STRING,
    judul_laporan: DataTypes.STRING,
    isi_laporan: DataTypes.TEXT,
    createdAt: {
        type: DataTypes.DATEONLY,
    },
    updatedAt: {
        type: DataTypes.DATEONLY,
    }
},{
    freezeTableName: true
});

export default Laporan;

(async()=>{
    await db.sync();
})();