import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const checkToken = async (req, res) => {
  try {
    const response = await Admin.findOne({
      where: {
        token: req.body.token,
      }, attributes: ['name', 'token']
    });
    // res.json(response)
    if (!response) {
      res.status(400).send("Invalid Credentials");
    } else {
      res.json(response)
    }
  } catch (error) {
    res.status(402).json(error);
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    const admin = await Admin.findOne({
      where: {
        username,
      },
    });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      // Create token
      const token = jwt.sign(
        { id: admin.id, username },
        process.env.ACCESS_TOKEN_SECRET
      );
      admin.token = token;
      res.cookie("accessToken", token, {
        httpOnly: false,
      });
      await Admin.update(
        { token: token },
        {
          where: {
            id: admin.id,
          },
        }
      );
      res.json({ token });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // try {
  //   const { username, password } = req.body;
  //   const response = await Admin.findOne({
  //     where: {
  //       username,
  //     },
  //   });
  //   if (!response) {
  //     res.status(402).json("success false");
  //   } else {
  //     if (response && (await bcrypt.compare(password, response.password))) {
  //       const token = jwt.sign(
  //         { id: response.id, username },
  //         process.env.ACCESS_TOKEN_SECRET
  //       );
  //       response.token = token;
  //       res.json({token})
  //     }
  //   }
  //   // res.status(200).json({token});
  // } catch (error) {
  //   console.log(error.message);
  // }
};

export const logoutAdmin = async (req, res) => {
  try {
    const response = await Admin.findOne({
      where: {
        token: req.body.token,
      },
    });
    res.json(response.token);
    await Admin.update(
      { token: null },
      {
        where: {
          token: response.token,
        },
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const addAdmin = async (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Admin.create({
      name: name,
      username: username,
      password: hashPassword,
    });
    res.status(201).json({ msg: "Admin Berhasil Dibuat" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!admin) return res.status(404).json({ msg: "Admin Tidak Ada" });
};
