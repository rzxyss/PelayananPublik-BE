import Admin from "../models/adminModel.js";

export const adminToken = async (req, res) => {
  try {
    const response = await Admin.findAll({
      where: {
        token: req.body.token,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const response = await Admin.findAll({
      where: {
        username: req.body.username,
      },
    });
    if (response.length > 0) {
      if (response[0].password === req.body.password) {
        res.json(response)
        const adminId = response[0].id;
        await Admin.update(
          { token: req.body.token },
          {
            where: {
              id: adminId,
            },
          }
        );
        sessionStorage.setItem('1', '1')
      } else {
        res.json({ msg: "Password Salah" });
      }
    } else {
      res.json({ msg: "Username Tidak Ada" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const logoutAdmin = async (req, res) => {
  try {
    const response = await Admin.findAll({
      where: {
        id: req.body.id,
      },
    });
    await Admin.update(
      { token: null },
      {
        where: {
          id: response[0].id,
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
