import { Request, Response } from 'express'
import { getProducts } from './product.service'
import { ProductErrorMessages } from './product.type'

const ProductController = {
  async getProductList(_req: Request, res: Response): Promise<void> {
    try {
      console.log('Buscando lista de produtos')
      res.status(200).json(await getProducts())
      console.log('Busca da lista de produtos finalizado')
    } catch (error: any) {
      const statusCode = error.response?.status ?? 500
      const message = error.message ?? ProductErrorMessages.GET
      console.log('Erro ao inserir produto à lista de desejo: ', message)
      res.status(statusCode).send({ message })
    }
  }
}

export default ProductController
