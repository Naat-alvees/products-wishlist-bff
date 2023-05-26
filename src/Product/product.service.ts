import axios from 'axios'
import { ShortProduct, ResponseAPIProduct, ShortProductResponse } from './product.type'

const apiUrl = 'https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e'

export async function getProducts(): Promise<ShortProductResponse> {
  console.log('Buscando dados da API externa')
  const response = await axios.get<ResponseAPIProduct>(apiUrl)
  console.log('Dados retornado da API externa')

  const arrShortProducts: ShortProduct[] = response.data.products.map(product => ({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image
  }))

  return { products: arrShortProducts }
}
