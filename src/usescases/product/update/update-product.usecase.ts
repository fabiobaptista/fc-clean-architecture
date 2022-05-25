import ProductRepoInterface from '@/domain/product/repo/product.repo.interface'
import { InputUpdateProductDto, OutputUpdateProductDto } from './update-product.dto'

export default class UpdateProductUseCase {
  private readonly productRepo: ProductRepoInterface
  constructor (productRepo: ProductRepoInterface) {
    this.productRepo = productRepo
  }

  async execute (input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.productRepo.find(input.id)
    product.changeName(input.name)
    product.changePrice(input.price)

    await this.productRepo.update(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
