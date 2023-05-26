import { Request, Response } from 'express'
import { WishlistErrorMessages } from './wishList.type'
import { ShortProduct } from 'src/Product/product.type'
import WishlistService from './wishList.service'

const WishlistController = {
  async getWishlistItems(_req: Request, res: Response): Promise<void> {
    try {
      console.log('Buscando itens da lista de desejos')
      res.status(200).json(await WishlistService.getWishlist())
      console.log('Busca da lista de desejos finalizada')
    } catch (error: any) {
      const statusCode = error.response?.status ?? 500
      const message = error.message ?? WishlistErrorMessages.GET
      console.log('Erro ao buscar lista de desejo', message)
      res.status(statusCode).send({ message })
    }
  },

  async addProductWishList(req: Request, res: Response): Promise<void> {
    try {
      const { id, title, price, image } = req.body

      const product: ShortProduct = {
        id: Number(id),
        title: String(title),
        price: Number(price),
        image: String(image)
      }

      await WishlistService.addProductToWishlist(product)
      res.status(201).send({ message: 'Produto adicionado à lista de desejos com sucesso' })
    } catch (error: any) {
      const statusCode = error.response?.status ?? 500
      const message = error.message ?? WishlistErrorMessages.POST
      console.log('Erro ao inserir produto à lista de desejo: ', message)
      res.status(statusCode).send({ message })
    }
  },

  async removeProductWishList(req: Request, res: Response): Promise<void> {
    try {
      const productId = Number(req.params.productId)
      await WishlistService.removeProductFromWishlist(productId)
      res.status(200).send({ message: 'Produto removido da lista de desejos com sucesso' })
    } catch (error: any) {
      const statusCode = error.response?.status ?? 500
      const message = error.message ?? WishlistErrorMessages.REMOVE
      console.log('Erro ao remover produto à lista de desejo: ', message)
      res.status(statusCode).send({ message })
    }
  }
}

export default WishlistController
