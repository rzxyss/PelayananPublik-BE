import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Agenda = db.define('data_agenda', {
    nama_acara: DataTypes.STRING,
    peserta: DataTypes.STRING,
    tgl_acara: DataTypes.DATEONLY,
    jam_mulai: DataTypes.TIME,
    jam_selesai: DataTypes.TIME,
    createdAt: {
        type: DataTypes.DATEONLY,
    },
    updatedAt: {
        type: DataTypes.DATEONLY,
    }
}, {
    freezeTableName: true
});

export default Agenda;

(async () => {
    await db.sync();
})();