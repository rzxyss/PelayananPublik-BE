import Account from "../models/accountModel.js";
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

export const addAccount = async (req, res) => {
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

export const Login = async (req, res) => {
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
      process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '20s'
    });
    const refreshToken = jwt.sign(
      { userId, name, username },
      process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d'
    });
    await Account.update(
      { access_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Username tidak ditemukan" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const results = await Account.findAll({
    where: {
      access_token: refreshToken,
    },
  });
  if (!results[0]) return res.sendStatus(204);
  const userId = results[0].id;
  await Account.update(
    { access_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
