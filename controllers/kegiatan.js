import path from "path";
import fs from "fs";
import Kegiatan from "../models/kegiatan.js";
import sharp from "sharp";

export const getKegiatan = async (req, res) => {
  try {
    const results = await Kegiatan.findAll();
    const count = await Kegiatan.count()
    res.json({
        results: results,
        totalRows: count
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getKegiatanById = async (req, res) => {
  try {
    const results = await Kegiatan.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(results);
  } catch (error) {
    console.log(error.message);
  }
};

export const addKegiatan = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const isi_kegiatan = req.body.isi_kegiatan;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/kegiatan/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Gambar lebih dari 5MB" });

    const compress = sharp(file.data)
    .resize({ width: 640, height: 480 })
    .jpeg({ quality: 80 })
    .toFile(`./public/kegiatan/${fileName}`);

  if (!compress) {
    console.log("Error");
  } else {
    try {
      await Kegiatan.create({
        isi_kegiatan: isi_kegiatan,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Berhasil Membuat Kegiatan" });
    } catch (error) {
      console.log(error.message);
    }
  }
};

export const editKegiatan = async (req, res) => {
  const results = await Kegiatan.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!results) return res.status(404).json({ msg: "Program Tidak Ada" });
  let fileName = "";
  if (req.files === null) {
    fileName = results.image;
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

    const filepath = `./public/kegiatan/${results.image}`;
    fs.unlinkSync(filepath);

    sharp(file.data)
      .resize({ width: 640, height: 480 })
      .jpeg({ quality: 80 })
      .toFile(`./public/kegiatan/${fileName}`);
  }
  const isi_kegiatan = req.body.isi_kegiatan;
  const url = `${req.protocol}://${req.get("host")}/kegiatan/${fileName}`;
  try {
    await Kegiatan.update(
      { isi_kegiatan: isi_kegiatan, image: fileName, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Berhasil Mengupdate Kegiatan" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteKegiatan = async (req, res) => {
  const results = await Kegiatan.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!results) return res.status(404).json({ msg: "Kegiatan Tidak Ada" });

  try {
    const filepath = `./public/kegiatan/${results.image}`;
    fs.unlinkSync(filepath);
    await Kegiatan.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Berhasil Menghapus Kegiatan" });
  } catch (error) {
    console.log(error.message);
  }
};
