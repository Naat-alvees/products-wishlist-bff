export enum ProductErrorMessages {
  GET = 'Erro ao buscar produtos'
}

export interface ShortProduct {
  id: number
  title: string
  price: number
  image: string
}

export interface ShortProductResponse {
  products: ShortProduct[]
}

export interface Product {
  id: number;
  sku: number;
  title: string;
  description: string;
  availableSizes: {
    [size: string]: number;
  };
  style: string;
  price: number;
  installments: number;
  currencyId: string;
  currencyFormat: string;
  isFreeShipping: boolean;
  image: string;
}

export interface ResponseAPIProduct {
  products: Product[]
}