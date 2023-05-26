import request from 'supertest'
import app from '../app'

import WishlistService from './wishList.service'
import { shortProductValid } from '../__mocks/shortProduct-valid'
import { shortProductListValid } from '../__mocks/shortProduct-list'
import { WishlistErrorMessages } from '../WishList/wishList.type'

const PRODUCT_VALID = shortProductValid
const PRODUCT_LIST_VALID = shortProductListValid

describe('Wishlist API', () => {
  beforeEach(() => {
    WishlistService.removeAllProductFromWishlist()
  })

  test('GET /wishlist should return an empty wishlist when there are no products', async () => {
    const response = await request(app).get('/wishlist')
    expect(response.status).toBe(200)
    expect(response.body.products).toHaveLength(0)
  })

  test('GET /wishlist should return all products in wishlist when there products', async () => {
    PRODUCT_LIST_VALID.forEach(async product => {
      await WishlistService.addProductToWishlist(product)
    })
    const response = await request(app).get('/wishlist')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ products: PRODUCT_LIST_VALID })
  })

  test('POST /wishlist should add a product to the wishlist when a valid product is provided', async () => {
    const response = await request(app).post('/wishlist').send(PRODUCT_VALID)
    expect(response.status).toBe(201)

    const wishlist = await WishlistService.getWishlist()
    expect(wishlist.products).toHaveLength(1)
    expect(wishlist.products[0]).toEqual(PRODUCT_VALID)
  })

  test('POST /wishlist should return an error when adding a duplicate product', async () => {
    await WishlistService.addProductToWishlist(PRODUCT_VALID)
    const response = await request(app).post('/wishlist').send(PRODUCT_VALID)

    expect(response.body.message).toBe(WishlistErrorMessages.PRODUCT_ALREADY_EXIST)
  })

  test('DELETE /wishlist/:productId should remove a product from the wishlist', async () => {
    await WishlistService.addProductToWishlist(PRODUCT_VALID)

    const response = await request(app).delete(`/wishlist/${PRODUCT_VALID.id}`)
    expect(response.status).toBe(200)

    const wishlist = await WishlistService.getWishlist()
    expect(wishlist.products).toHaveLength(0)
  })

  test('DELETE /wishlist/:productId should return an error when removing a non-existing product', async () => {
    const productId = 1

    const response = await request(app).delete(`/wishlist/${productId}`)
    expect(response.body.message).toBe(WishlistErrorMessages.PRODUCT_NOT_FOUND)
  })
})
