import Berita from "../models/beritaModel.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";
import sharp from "sharp";

export const getBerita = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search_query || "";
  const offset = limit * page;
  try {
    const results = await Berita.findAll({
      limit: limit,
      offset: offset,
      where: {
        [Op.or]: [
          {
            judul_berita: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
    });

    const totalRows = await Berita.count({
      where: {
        [Op.or]: [
          {
            judul_berita: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
    });

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

export const getBeritaById = async (req, res) => {
  try {
    const response = await Berita.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const likeBerita = async (req, res) => {
  const response = await Berita.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!response) {
    res.status(404).json({ msg: "Berita Tidak Ada" });
  }
  const like = req.body.like;
  try {
    await Berita.update(
      {
        like: like,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
    });
  }
};

export const getBeritaLatest = async (req, res) => {
  try {
    const response = await Berita.findAll({
      limit: 3,
      order: [["createdAt", "DESC"]],
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getBeritaPopuler = async (req, res) => {
  try {
    const response = await Berita.findAll({
      limit: 3,
      order: [["like", "DESC"]],
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveBerita = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const judul_berita = req.body.judul_berita;
  const deskripsi_berita = req.body.deskripsi_berita;
  const isi_berita = req.body.isi_berita;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Gambar lebih dari 5MB" });

  const compress = sharp(file.data)
    .resize({ width: 640, height: 480 })
    .jpeg({ quality: 80 })
    .toFile(`./public/images/${fileName}`);

  if (!compress) {
    console.log("Error");
  } else {
    try {
      await Berita.create({
        judul_berita: judul_berita,
        deskripsi_berita: deskripsi_berita,
        isi_berita: isi_berita,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Berhasil Membuat Berita" });
    } catch (error) {
      console.log(error.message);
    }
  }
};

export const editBerita = async (req, res) => {
  const berita = await Berita.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!berita) return res.status(404).json({ msg: "Berita Tidak Ada" });
  let fileName = "";
  if (req.files === null) {
    fileName = berita.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${berita.image}`;
    fs.unlinkSync(filepath);

    sharp(file.data)
    .resize({ width: 640, height: 480 })
    .jpeg({ quality: 80 })
    .toFile(`./public/images/${fileName}`);
  }
  const judul_berita = req.body.judul_berita;
  const deskripsi_berita = req.body.deskripsi_berita;
  const isi_berita = req.body.isi_berita;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  try {
    await Berita.update(
      {
        judul_berita: judul_berita,
        deskripsi_berita: deskripsi_berita,
        isi_berita: isi_berita,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Berhasil Mengupdate Berita" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteBerita = async (req, res) => {
  const berita = await Berita.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!berita) return res.status(404).json({ msg: "Berita Tidak Ada" });

  try {
    const filepath = `./public/images/${berita.image}`;
    fs.unlinkSync(filepath);
    await Berita.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Berhasil Menghapus Berita" });
  } catch (error) {
    console.log(error.message);
  }
};
