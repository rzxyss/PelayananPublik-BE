import Account from "../models/account.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const results = await Account.findAll({
      attributes: ["id", "name", "username "],
    });
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

export const SignUp = async (req, res) => {
  const { name, username, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Account.create({
      name: name,
      username: username,
      password: hashPassword,
    });
    res.json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const SignIn = async (req, res) => {
  try {
    const results = await Account.findAll({
      where: {
        username: req.body.username,
      },
    });
    const match = await bcrypt.compare(req.body.password, results[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const userId = results[0].id;
    const name = results[0].name;
    const username = results[0].username;
    const accessToken = jwt.sign(
      { userId, name, username },
      process.env.ACCESS_TOKEN_SECRET
    );
    await Account.update(
      { access_token: accessToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Username tidak ditemukan" });
  }
};

export const SignOut = async (req, res) => {
  const accessToken = req.body.accessToken;
  if (!accessToken)
    return res.status(204).json({
      success: false,
    });
  const results = await Account.findAll({
    where: {
      access_token: accessToken,
    },
  });
  if (!results[0])
    return res.status(204).json({
      success: false,
    });
  const userId = results[0].id;
  await Account.update(
    { access_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  return res.status(200).json({
    success: true,
  });
};
