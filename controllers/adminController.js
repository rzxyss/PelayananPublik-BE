import Admin from "../models/adminModel.js";

export const adminToken = async (req, res) => {
  try {
    const response = await Admin.findOne({
      where: {
        token: req.body.token,
      },
    });
    res.status(200).json(response.token);
  } catch (error) {
    res.status(402).json(error)
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const response = await Admin.findOne({
      where: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    if (!response) {
      res.status(402).json("success false");
    } else {
      res.status(200).json(response.id);
        const idAdmin = response.id
        await Admin.update(
          {
            token: req.body.token,
          },
          {
            where: {
              id: idAdmin,
            },
          }
        );
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const logoutAdmin = async (req, res) => {
  try {
    const response = await Admin.findOne({
      where: {
        token: req.body.token,
      },
    });
    res.json(response.token)
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
  try {
    await Admin.create({ name: name, username: username, password: password });
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
