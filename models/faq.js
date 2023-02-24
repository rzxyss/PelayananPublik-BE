import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Faq = db.define('data_faq', {
    type: DataTypes.ENUM('Seputar Pendaftaran Prakerin', 'Seputar Program Tikomdik', 'Seputar Kegiatan Tikomdik'),
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    createdAt: {
        type: DataTypes.DATEONLY,
    },
    updatedAt: {
        type: DataTypes.DATEONLY,
    }
}, {
    freezeTableName: true
});

export default Faq;

(async () => {
    await db.sync();
})();