import Faq from "../models/faq.js";

export const getFaq = async(req, res)=>{
    try {
        const response = await Faq.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const findByType = async(req, res)=>{
    try {
        const response = await Faq.findAll({
            where: {
                type: req.body.type
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
        res.status(201).json({msg: "Berhasil Membuat FaQ"});
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
        res.status(200).json({msg: "Berhasil Mengupdate FaQ"});
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
        if(!faq) return res.status(404).json({msg: "FaQ Tidak Ada"});
}


