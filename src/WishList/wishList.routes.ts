import express from 'express'
import WishlistController from './wishList.controller'

const wishListRouter = express.Router()

wishListRouter.get('/wishList', WishlistController.getWishlistItems)
wishListRouter.post('/wishList', WishlistController.addProductWishList)
wishListRouter.delete('/wishList/:productId', WishlistController.removeProductWishList)

export default wishListRouter
