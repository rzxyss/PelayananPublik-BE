import path from "path";
import fs from "fs";
import Komentar from "../models/komentarModel.js";

export const getKomentar = async(req, res)=>{
    try {
        const response = await Komentar.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getKomentarById = async(req, res)=>{
    try {
        const response = await Komentar.findOne({
            where: {
                id : req.params.id 
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveKomentar = async (req, res)=>{
    try {
        await Komentar.create(req.body);
        res.status(201).json({msg: "Komentar Berhasil Dibuat"});
    } catch (error) {
        console.log(error.message);
    }
}

export const editKomentar = async(req, res)=>{
    try {
        await Komentar.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteKomentar = async(req, res)=>{
        const faq = await Komentar.findOne({
            where: {
                id : req.params.id 
            }
        }); 
        if(!faq) return res.status(404).json({msg: "No Data Found"});
}


