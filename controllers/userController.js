import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Purchase from "../models/PurchaseModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if(!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Usuário não encontrado" });
    }
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong", error });
  }
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const purchases = await Purchase.countDocuments();
  res.status(StatusCodes.OK).json({ users, purchases });
};

export const updateUser = async (req, res) => {
  try {
     const newUser = { ...req.body };
     delete newUser.password;

     if (req.file) {
       const response = await cloudinary.v2.uploader.upload(req.file.path);
       await fs.unlink(req.file.path);
       newUser.avatar = response.secure_url;
       newUser.avatarPublicId = response.public_id;
     }
     const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

     if (req.file && updatedUser.avatarPublicId) {
       await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
     }
     res.status(StatusCodes.OK).json({ msg: "update user" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong", error });
  }
 
};
