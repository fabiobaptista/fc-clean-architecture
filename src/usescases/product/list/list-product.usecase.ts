import Product from '@/domain/product/entity/product'
import ProductRepoInterface from '@/domain/product/repo/product.repo.interface'
import { InputListProductDto, OutputListProductDto, OutputListProductsDto } from './list-product.dto'

export class ListProductUseCase {
  private readonly productRepo: ProductRepoInterface
  constructor (productRepo: ProductRepoInterface) {
    this.productRepo = productRepo
  }

  async execute (input: InputListProductDto): Promise<OutputListProductsDto> {
    const list = await this.productRepo.findAll()
    const products = list.map((c: Product): OutputListProductDto => ({
      id: c.id,
      name: c.name,
      price: c.price
    }))
    return { products }
  }
}
