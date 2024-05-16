import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import mongoose from "mongoose";
import Purchase from '../models/PurchaseModel.js'
import User from '../models/UserModel.js'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('Não encontramos')) {
          throw new NotFoundError(errorMessages)
        }
        if(errorMessages[0].startsWith('Não autorizado')) {
          throw new UnauthorizedError("Não autorizado a acessar esta rota");
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validatePurchaseInput = withValidationErrors([
  // body("date")
  //   .notEmpty()
  //   .withMessage("A data precisa ser informada!")
  //   .isDate()
  //   .withMessage("Precisa ser uma data!"),
  body("brand")
    .notEmpty()
    .withMessage("A marca precisa ser informada!")
    .trim()
    .isLength({ max: 30 })
    .withMessage("O tamanho máximo é de 30 caracteres"),
  body("weight")
    .notEmpty()
    .withMessage("O peso precisa ser informado!")
    .isNumeric()
    .withMessage("Campo numérico")
    .isFloat({ min: 1, max: 50 })
    .withMessage("Máximo permitido é 50 "),
  body("price")
    .notEmpty()
    .withMessage("O preço precisa ser informado!")
    .isNumeric()
    .withMessage("Campo numérico")
    .isFloat({ min: 1, max: 1000 })
    .withMessage("Máximo permitido é 1000"),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, {req})=> {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if(!isValidId) throw new BadRequestError('Id inválido') // no lugar do BadRequestError pode usar Error classe de erro do js

      const purchase = await Purchase.findById(value);
      if (!purchase)
        throw new NotFoundError( // no lugar do BadRequestError pode usar Error classe de erro do js
          `Não encontramos nenhuma compra com o id ${value}`
        );
      const isAdmin = req.user.role === 'admin'
      const isOwner = req.user.userId === purchase.createdBy.toString()
      if(!isAdmin && !isOwner) throw new UnauthorizedError('Não autorizado a acessar esta rota')
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("O nome precisa ser informado.")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("O nome precisa ter entre 3 e 30 caracteres"),
  body("lastName")
    .notEmpty()
    .withMessage("O sobrenome precisa ser informado.")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("O sobrenome precisa ter entre 3 e 50 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("O email precisa ser informado.")
    .trim()
    .isEmail()
    .withMessage("Formato inválido de email")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("O email já está cadastrado.");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("A senha precisa ser informada.")
    .isLength({min:8})
    .withMessage("A senha precisa ter pelo menos 8 caracteres")
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("O email precisa ser informado.")
    .trim()
    .isEmail()
    .withMessage("Formato inválido de email"),
  body("password")
    .notEmpty()
    .withMessage("A senha precisa ser informada.")
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("O nome precisa ser informado.")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("O nome precisa ter entre 3 e 30 caracteres"),
  body("lastName")
    .notEmpty()
    .withMessage("O sobrenome precisa ser informado.")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("O sobrenome precisa ter entre 3 e 50 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("O email precisa ser informado.")
    .trim()
    .isEmail()
    .withMessage("Formato inválido de email")
    .custom(async (email, {req}) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("O email já está cadastrado.");
      }
    }),
]);

export const validatePassword = withValidationErrors([
  body("password")
    .notEmpty()
    .withMessage("A senha precisa ser informada.")
    .isLength({ min: 8 })
    .withMessage("A senha precisa ter pelo menos 8 caracteres"),
]);