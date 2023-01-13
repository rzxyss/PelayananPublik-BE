import path from "path";
import fs from "fs";
import Pengaduan from "../models/pengaduanModel.js";

export const getPengaduan = async(req, res)=>{
    try {
        const response = await Pengaduan.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getPengaduanById = async(req, res)=>{
    try {
        const response = await Pengaduan.findOne({
            where: {
                id : req.params.id 
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const savePengaduan = async (req, res)=>{
    try {
        await Pengaduan.create(req.body);
        res.status(201).json({msg: "Pengaduan Berhasil Dibuat"});
    } catch (error) {
        console.log(error.message);
    }
}

export const editPengaduan = async(req, res)=>{
    try {
        await Pengaduan.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePengaduan = async(req, res)=>{
        const faq = await Pengaduan.findOne({
            where: {
                id : req.params.id 
            }
        }); 
        if(!faq) return res.status(404).json({msg: "No Data Found"});
}


