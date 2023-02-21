import { Sequelize } from "sequelize";
import Agenda from "../models/agenda.js";

export const getAgenda = async (req, res) => {
  try {
    const results = await Agenda.findAll({
      attributes: {
        include: [
          "id",
          "nama_acara",
          "peserta",
          "tgl_acara",
          [
            Sequelize.fn
            (
              "DATE_FORMAT", 
              Sequelize.col("jam_mulai"), 
              "%H:%i"
            ),
            "jam_mulai",
          ],
          [
            Sequelize.fn
            (
              "DATE_FORMAT", 
              Sequelize.col("jam_selesai"), 
              "%H:%i"
            ),
            "jam_selesai",
          ],
        ]
      }
    });
    const count = await Agenda.count()
    res.json({
        results: results,
        totalRows: count
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getTglAgenda = async (req, res) => {
  try {
    const response = await Agenda.findAll({
      where: {
        tgl_acara: req.body.tgl_acara,
      },
      attributes: {
        include: [
          "id",
          "nama_acara",
          "peserta",
          "tgl_acara",
          [
            Sequelize.fn
            (
              "DATE_FORMAT", 
              Sequelize.col("jam_mulai"), 
              "%H:%i"
            ),
            "jam_mulai",
          ],
          [
            Sequelize.fn
            (
              "DATE_FORMAT", 
              Sequelize.col("jam_selesai"), 
              "%H:%i"
            ),
            "jam_selesai",
          ],
        ]
      }
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const addAgenda = async (req, res) => {
  try {
    await Agenda.create(req.body);
    res.status(201).json({ msg: "Berhasil Membuat Agenda" });
  } catch (error) {
    console.log(error.message);
  }
};

export const editAgenda = async (req, res) => {
  try {
    await Agenda.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Berhasil Mengupdate FaQ" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAgenda = async (req, res) => {
  const results = await Agenda.findAll({
    where: {
      id: req.params.id,
    },
  });
  if (!results) return res.status(404).json({ msg: "Agenda Tidak Ada" });
  try {
    await Agenda.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Berhasil Menghapus Agenda" });
  } catch (error) {
    console.log(error.message)
  }
};
