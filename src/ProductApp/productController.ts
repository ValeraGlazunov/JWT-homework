// const productService = require('../services/productService')
import productService from "./productService"

import express, { Express, Request, Response } from 'express'


async function getAllProducts(req:Request, res:Response) {
    const max  = Number(req.query.max)
    const context = await productService.getAllProducts(max)
    res.render('products', {products: context.products, username: res.locals.user.username})
    console.log(res.locals.user)
}

function getProductById(req:Request, res:Response){
    // console.log(req.params.id)
    const id = Number(req.params.id)
    const data = productService.getProductById(id)
    if (id <= data.length){
        res.render('product', data.context)
    } else{
        res.send("ban")
    }
}

function createProduct(req:Request, res:Response){
    const data = req.body
    console.log(data)
    productService.createProduct(data);
    res.send('okay');

}
const jwt = require('jsonwebtoken');


// Функція для створення токена




const productControllers = {
    getAllProducts: getAllProducts,
    getProductById: getProductById,
    createProduct: createProduct
}

export default productControllers