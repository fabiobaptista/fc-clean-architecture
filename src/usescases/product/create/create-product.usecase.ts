import Product from '@/domain/product/entity/product'
import ProductRepoInterface from '@/domain/product/repo/product.repo.interface'
import { InputCreateProductDto, OutputCreateProductDto } from './create-product.dto'

export default class CreateProductUseCase {
  private readonly productRepo: ProductRepoInterface
  constructor (productRepo: ProductRepoInterface) {
    this.productRepo = productRepo
  }

  async execute (input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = new Product(input.id, input.name, input.price)

    await this.productRepo.create(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
