import Laporan from "../models/laporanModel.js";

export const getLaporan = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 5;
  const offset = limit * page;

  try {
    const results = await Laporan.findAll({
      limit: limit,
      offset: offset,
    });
    
    const totalRows = await Laporan.count();

    const totalPage = Math.ceil(totalRows / limit);

    res.json({
      results: results,
      page: page,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPengaduan = async (req, res) => {
  try {
    const response = await Laporan.findAll({
      where: {
        jenis_laporan: "Pengaduan",
      },
    });
    const count = await Laporan.count({
      where: {
        jenis_laporan: "Pengaduan",
      },
    });
    res.json({
      result: response,
      totalRows: count,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAspirasi = async (req, res) => {
  try {
    const response = await Laporan.findAll({
      where: {
        jenis_laporan: "Aspirasi",
      },
    });
    const count = await Laporan.count({
      where: {
        jenis_laporan: "Aspirasi",
      },
    });
    res.json({
      result: response,
      totalRows: count,
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getInformasi = async (req, res) => {
  try {
    const response = await Laporan.findAll({
      where: {
        jenis_laporan: "Permintaan Informasi",
      },
    });
    const count = await Laporan.count({
      where: {
        jenis_laporan: "Permintaan Informasi",
      },
    });
    res.json({
      result: response,
      totalRows: count,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const detailLaporan = async (req, res) => {
  try {
    const response = await Laporan.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveLaporan = async (req, res) => {
  try {
    await Laporan.create(req.body);
    res.status(201).json({ msg: "Berhasil Membuat Laporan" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteLaporan = async (req, res) => {
  const laporan = await Laporan.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!laporan) return res.status(404).json({ msg: "Laporan Tidak Ada" });
  try {
    await Laporan.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Berhasil Menghapus Laporan" });
  } catch (error) {
    console.log(error.message);
  }
};
