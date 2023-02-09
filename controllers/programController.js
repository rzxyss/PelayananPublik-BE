import path from "path";
import fs from "fs";
import Program from "../models/programModel.js";

export const getProgram = async (req, res) => {
  try {
    const results = await Program.findAll();
    const count = await Program.count();
    res.json({
      results: results,
      totalRows: count,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getProgramById = async (req, res) => {
  try {
    const results = await Program.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(results);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveProgram = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const judul_program = req.body.judul_program;
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
      await Program.create({
        judul_program: judul_program,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Berhasil Membuat Program" });
    } catch (error) {
      console.log(error.message);
    }
  }
};

export const editProgram = async (req, res) => {
  const program = await Program.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!program) return res.status(404).json({ msg: "Program Tidak Ada" });
  let fileName = "";
  if (req.files === null) {
    fileName = program.image;
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

    const filepath = `./public/images/${program.image}`;
    fs.unlinkSync(filepath);

    sharp(file.data)
      .resize({ width: 640, height: 480 })
      .jpeg({ quality: 80 })
      .toFile(`./public/images/${fileName}`);
  }
  const judul_program = req.body.judul_program;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  try {
    await Program.update(
      { judul_program: judul_program, image: fileName, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Berhasil Mengupdate Program" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProgram = async (req, res) => {
  const program = await Program.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!program) return res.status(404).json({ msg: "Program Tidak Ada" });

  try {
    const filepath = `./public/images/${program.image}`;
    fs.unlinkSync(filepath);
    await Program.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Berhasil Menghapus FaQ" });
  } catch (error) {
    console.log(error.message);
  }
};
