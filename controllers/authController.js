import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";
import nodemailer from "nodemailer";
import Token from "../models/TokenModel.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";


export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "Usuário criado" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new UnauthenticatedError("email não cadastrado");
  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect) throw new UnauthenticatedError("senha incorreta");

  const oneDay = 1000 * 60 * 60 * 24;

  const token = createJWT({ userId: user._id, role: user.role });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "Usuário logado" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "Usuário deslogado" });
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Email é necessário" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Email não cadastrado" });
    }

    let token = await Token.findOne({ userId: user._id });
    if (token) {
      await token.deleteOne();
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const hash = await hashPassword(resetToken);

    await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    const link = `http://localhost:5173/reset-password?token=${resetToken}&id=${user._id}`;
    // const link = `http://localhost:5173/reset-password?token=${encodeURIComponent(
    //   resetToken
    // )}&id=${user._id}`;

    await sendEmail(
      user.email,
      "Solicitação de redefinição de senha",
      {
        name: user.name,
        link: link,
      },
      "../utils/template/requestResetPassword.handlebars"
    );
    return res
      .status(StatusCodes.OK)
      .json({ msg: "Email de redefinição de senha enviado." });
  } catch (error) {
    console.error("Error during password reset request:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Erro ao processar a solicitação de redefinição de senha.",
    });
  }
};

export const resetPassword = async (userId, token, password) => {
  let passwordResetToken = await Token.findOne({ userId });
  // console.log(passwordResetToken.token, token);

  if (!passwordResetToken) {
    throw new Error(
      "Token de resetar a senha é inválido ou está expiradoooooooo"
    );
  }

  const isValid = await comparePassword(token, passwordResetToken.token);

  if (!isValid) {
    throw new Error(
      "TTTTTTToken de resetar a senha é inválido ou está expirado"
    );
  }

  const hash = await hashPassword(password);

  await User.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );

  const user = await User.findById({ _id: userId });

  sendEmail(
    user.email,
    "Senha redefinida com sucesso",
    {
      name: user.name,
    },
    "../utils/template/resetPassword.handlebars"
  );

  await passwordResetToken.deleteOne();

  return { message: "A redefinição de senha foi um sucesso" };
};

export const resetPasswordController = async (req, res, next) => {
  console.log("Received token:", req.body);
  const resetPasswordService = await resetPassword(
    req.body.userId,
    req.body.token,
    req.body.password
  );
  return res.json(resetPasswordService);
};
