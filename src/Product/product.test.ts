import request from 'supertest'
import app from '../app'

import { getProducts } from './product.service'
import { ProductErrorMessages, ShortProductResponse } from './product.type'

import { shortProductListValid } from '../__mocks/shortProduct-list'

const PRODUCT_LIST_VALID = shortProductListValid

jest.mock('./product.service')

describe('Product API', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('GET /products should return all products when there are product', async () => {
    const mockResponse: ShortProductResponse = {
      products: PRODUCT_LIST_VALID
    }

    ;(getProducts as jest.Mock).mockResolvedValue(mockResponse)

    const response = await request(app).get('/products')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockResponse)
    expect(getProducts).toHaveBeenCalledTimes(1)
  })

  test('GET /products should return an error when getProducts throws an exception', async () => {
    ;(getProducts as jest.Mock).mockRejectedValue(new Error(ProductErrorMessages.GET))

    const response = await request(app).get('/products')

    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: ProductErrorMessages.GET })
    expect(getProducts).toHaveBeenCalledTimes(1)
  })
})
