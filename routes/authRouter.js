import {Router} from "express"
const router = Router()
import {register, login, logout, requestPasswordReset, resetPasswordController} from '../controllers/authController.js'
import { validateRegisterInput, validateLoginInput, validatePassword } from "../middleware/validationMiddleware.js"

router.post('/register', validateRegisterInput, register)
router.post('/login', validateLoginInput, login)
router.get('/logout', logout)
router.post("/request-password-reset", requestPasswordReset);
router.post('/reset-password', validatePassword, resetPasswordController)

export default router