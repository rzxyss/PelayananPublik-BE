import path from "path";
import fs from "fs";
import Admin from "../models/adminModel.js";

export const getAdmin = async(req, res)=>{
    try {
        const response = await Admin.findAll({
          where: {
            username: req.body.username
          }
        });
        if(response.length > 0) {
          if (response[0].password === req.body.password) {
            res.json(response)
          } else {
            res.json({msg: 'Password Salah'})
          }
        } else {
          res.json("Username / Password Salah");
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const addAdmin = async (req, res)=>{
    try {
        await Admin.create(req.body);
        res.status(201).json({msg: "Admin Berhasil Dibuat"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteAdmin = async(req, res)=>{
        const admin = await Admin.findOne({
            where: {
                id : req.params.id 
            }
        }); 
        if(!admin) return res.status(404).json({msg: "Admin Tidak Ada"});
}