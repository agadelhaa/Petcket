import { UnauthenticatedError, UnauthorizedError } from "../errors/customErrors.js"
import { verifyJWT } from "../utils/tokenUtils.js"

export const authenticateUser = (req,res, next) => {
    const {token} = req.cookies
    if(!token) throw new UnauthenticatedError('Autenticação inválida')
    try {
        const {userId, role} = verifyJWT(token)
        req.user = {userId, role}
         next();
    } catch (error) {
        throw new UnauthenticatedError('Autenticação inválida')
    }
}

export const authorizedPermissions = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            throw new UnauthorizedError('Não autorizado a acessar esta rota')
        }
          next()
    }
}