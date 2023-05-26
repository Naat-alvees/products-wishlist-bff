import { ShortProduct, ShortProductResponse } from 'src/Product/product.type'
import { WishlistErrorMessages } from './wishList.type'

const wishlistDB: ShortProduct[] = []

const WishlistService = {
  async getWishlist(): Promise<ShortProductResponse> {
    console.log('Buscando itens da lista de desejos')
    return { products: wishlistDB }
  },

  async addProductToWishlist(product: ShortProduct): Promise<void> {
    console.log('Adicionando produto à lista de desejos')

    if (wishlistDB.some(item => item.id === product.id)) {
      throw new Error(WishlistErrorMessages.PRODUCT_ALREADY_EXIST)
    }

    wishlistDB.push(product)
    console.log('Produto adicionado à lista de desejos')
  },

  async removeProductFromWishlist(productId: number): Promise<void> {
    console.log('Removendo produto da lista de desejos')

    const index = wishlistDB.findIndex(item => item.id === productId)
    if (index === -1) {
      throw new Error(WishlistErrorMessages.PRODUCT_NOT_FOUND)
    }

    wishlistDB.splice(index, 1)
    console.log('Produto removido da lista de desejos')
  }
}

export default WishlistService
