import path from "path";
import fs from "fs";
import Admin from "../models/adminModel.js";
import Randomstring from "randomstring";

export const getAllAdmin = async(req,res) => {
  try {
    const response = await Admin.findAll();
    res.json(response);
  } catch (error) {
      console.log(error.message);
  }
}

export const getToken = async(req,res) => {
  try {
    const response = await Admin.findAll({
      where: {
        token: req.body.token,
      }
    })
    res.json(response)
  } catch (error) {
    console.log(error.message)
  }
}

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
          res.json({msg: 'Username Tidak Ada'})
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const addAdmin = async (req, res)=>{
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const token = Randomstring.generate();
    try {
        await Admin.create({name: name, username: username, password: password, token: token});
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