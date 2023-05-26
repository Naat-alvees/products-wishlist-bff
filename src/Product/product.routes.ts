import express from 'express'
import ProductController from './product.controller'

const productRouter = express.Router()

productRouter.get('/products', ProductController.getProductList)

export default productRouter
