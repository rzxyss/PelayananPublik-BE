import Berita from "../models/beritaModel.js";
import path from "path";
import fs from "fs";

export const getBerita = async(req, res)=>{
    try {
        const response = await Berita.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getBeritaById = async(req, res)=>{
    try {
        const response = await Berita.findOne({
            where: {
                id : req.params.id 
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveBerita = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const judul_berita = req.body.judul_berita;
    const deskripsi_berita = req.body.deskripsi_berita;
    const isi_berita = req.body.isi_berita;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Gambar lebih dari 5MB"}); 

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Berita.create({judul_berita: judul_berita, deskripsi_berita: deskripsi_berita, isi_berita: isi_berita, image: fileName, url: url});
            res.status(201).json({msg: "Berita Berhasil Dibuat."});
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const editBerita = async(req, res)=>{
    const berita = await Berita.findOne({
        where: {
            id : req.params.id 
        }
    }); 
    if(!berita) return res.status(404).json({msg: "No Data Found"});
    let fileName = "";
    if(req.file === null){
        fileName = Berita.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg']; 

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"}); 

        const filepath = `./public/images/${berita.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        })
    }
    const judul_berita = req.body.judul_berita;
    const deskripsi_berita = req.body.deskripsi_berita;
    const isi_berita = req.body.isi_berita;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await Berita.update({judul_berita: judul_berita, deskripsi_berita: deskripsi_berita, isi_berita: isi_berita, image: fileName, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Berita Telah Diedit"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteBerita = async(req, res)=>{
        const berita = await Berita.findOne({
            where: {
                id : req.params.id 
            }
        }); 
        if(!berita) return res.status(404).json({msg: "No Data Found"});

        try {
            const filepath = `./public/images/${berita.image}`;
            fs.unlinkSync(filepath);
            await Berita.destroy({
                where: {
                    id : req.params.id 
                }
            });
            res.status(200).json({msg: "Berita Sukses Dihapus"});    
        } catch (error) {
            console.log(error.message);
        }
}


