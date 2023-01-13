import Berita from "../models/beritaModel.js";
import path from "path";
import fs from "fs";
import Program from "../models/programModel.js";

export const getProgram = async(req, res)=>{
    try {
        const response = await Program.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProgramById = async(req, res)=>{
    try {
        const response = await Program.findOne({
            where: {
                id : req.params.id 
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveProgram = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const judul_program= req.body.judul_program;
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
            await Program.create({judul_program: judul_program, image: fileName, url: url});
            res.status(201).json({msg: "Program Berhasil Dibuat."});
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const editProgram = async(req, res)=>{
    const program = await Program.findOne({
        where: {
            id : req.params.id 
        }
    }); 
    if(!program) return res.status(404).json({msg: "No Data Found"});
    let fileName = "";
    if(req.file === null){
        fileName = Program.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg']; 

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"}); 

        const filepath = `./public/images/${program.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        })
    }
    const judul_program = req.body.judul_program;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await Program.update({judul_program: judul_program, image: fileName, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Program Telah Diedit"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteProgram = async(req, res)=>{
        const program = await Program.findOne({
            where: {
                id : req.params.id 
            }
        }); 
        if(!program) return res.status(404).json({msg: "No Data Found"});

        try {
            const filepath = `./public/images/${program.image}`;
            fs.unlinkSync(filepath);
            await Program.destroy({
                where: {
                    id : req.params.id 
                }
            });
            res.status(200).json({msg: "Program Sukses Dihapus"});    
        } catch (error) {
            console.log(error.message);
        }
}


