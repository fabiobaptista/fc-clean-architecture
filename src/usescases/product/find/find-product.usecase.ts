import ProductRepoInterface from '@/domain/product/repo/product.repo.interface'
import { InputFindProductDto, OutputFindProductDto } from './find-product.dto'

export default class FindProductUseCase {
  private readonly customerRepo: ProductRepoInterface
  constructor (customerRepo: ProductRepoInterface) {
    this.customerRepo = customerRepo
  }

  async execute (input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.customerRepo.find(input.id)

    const output: OutputFindProductDto = {
      id: product.id,
      name: product.name,
      price: product.price
    }

    return output
  }
}
