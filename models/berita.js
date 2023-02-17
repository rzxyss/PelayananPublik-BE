import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Berita = db.define('data_berita',{
    judul_berita: DataTypes.STRING,
    deskripsi_berita: DataTypes.STRING,
    isi_berita: DataTypes.TEXT,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    like: DataTypes.INTEGER,
    createdAt: {
        type: DataTypes.DATEONLY,
    },
    updatedAt: {
        type: DataTypes.DATEONLY,
    }
},{
    freezeTableName: true
});

export default Berita;

(async()=>{
    await db.sync();
})();