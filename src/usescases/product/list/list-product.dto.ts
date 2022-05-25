export interface OutputListProductDto {
  id: string
  name: string
  price: number
}

export interface InputListProductDto {}

export interface OutputListProductsDto {
  products: OutputListProductDto[]
}
