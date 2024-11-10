import {Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '../config/token';

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const cookies = req.cookies
    if (cookies.token){
        // console.log("user authenticated ")
        const token = verify(cookies.token, SECRET_KEY)
        // console.log(token)
        res.locals.user = token
        next()
    } else {
        res.sendStatus(401)
    }
}

