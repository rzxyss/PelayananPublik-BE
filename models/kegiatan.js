import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Kegiatan = db.define('data_kegiatan',{
    isi_kegiatan: DataTypes.TEXT,
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

export default Kegiatan;

(async()=>{
    await db.sync();
})();