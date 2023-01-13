import path from "path";
import fs from "fs";
import Faq from "../models/faqModel.js";

export const getFaq = async(req, res)=>{
    try {
        const response = await Faq.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getFaqById = async(req, res)=>{
    try {
        const response = await Faq.findOne({
            where: {
                id : req.params.id 
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveFaq = async (req, res)=>{
    try {
        await Faq.create(req.body);
        res.status(201).json({msg: "Faq Berhasil Dibuat"});
    } catch (error) {
        console.log(error.message);
    }
}

export const editFaq = async(req, res)=>{
    try {
        await Faq.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteFaq = async(req, res)=>{
        const faq = await Faq.findOne({
            where: {
                id : req.params.id 
            }
        }); 
        if(!faq) return res.status(404).json({msg: "No Data Found"});
}


