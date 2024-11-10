// const express = require('express')
// const router = express.Router()
// const productController = require('../controllers/productController')
// router.get('/all', productController.getAllProducts)
// router.get('/:id', productController.getProductById)
// router.post('/create', productController.createProduct)
// module.exports = router
import userControllers from './userController';
import {Router} from 'express';

const router = Router();

router.post('/login', userControllers.authUser)
router.get('/login', userControllers.login)

export default router;