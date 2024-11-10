import express, { Express, Request, Response } from 'express'
import userService from './userService'
import { SECRET_KEY } from '../config/token'
import { sign } from 'jsonwebtoken'

function login(req: Request, res: Response){
    res.render('login')
}

function registration(req: Request, res: Response){
    res.render('registration')
}

async function authUser(req: Request, res: Response){
    // console.log(req.body)
    // // метод cookie отправляет специальный заголовок Set-Cookie
    // res.cookie('user', req.body.email)
    // res.sendStatus(200)

    const data = req.body
    const user = await userService.authUser(data.email, data.password)
    
    if (user == 'error'){
        res.send('error')
        return 
    }
    const token = sign(user, SECRET_KEY, {expiresIn: '1h'})
    res.cookie('token', token)
    res.sendStatus(200)
}

const jwt = require('jsonwebtoken');

function createToken(user: { id: number; name: string; email: string }) {
    return jwt.sign(
        { id: user.id, name: user.name, email: user.email }, 
        { expiresIn: process.env.JWT_EXPIRES_IN } 
    );
}

async function registerUser(req: Request, res: Response){
    const data = req.body
    const result = await userService.registerUser(data)
    if (result.status == 'error'){
        res.send(result.message)
        return
    }
    const token = sign(result.data, SECRET_KEY, {expiresIn: '1h'})
    res.cookie('token', token)
    res.sendStatus(200)
}


const userController = {
    login: login,
    authUser: authUser
}

export default userController