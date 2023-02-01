import Account from "../models/accountModel.js";

export const verifyToken = async (req, res) => {
  try {
    const accessToken = req.body.accessToken;
    if (!accessToken)
      return res.status(402).json({
        success: false,
      });
    const results = await Account.findAll({
      where: {
        access_token: accessToken,
      },
    });
    if (!results[0])
      return res.status(402).json({
        success: false,
      });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
