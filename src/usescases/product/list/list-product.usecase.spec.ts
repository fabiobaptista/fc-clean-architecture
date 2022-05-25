import Product from '@/domain/product/entity/product'
import ProductRepoInterface from '@/domain/product/repo/product.repo.interface'
import { InputListProductDto, OutputListProductsDto } from './list-product.dto'
import { ListProductUseCase } from './list-product.usecase'

const product1 = new Product('1', 'Product 1', 10)
const product2 = new Product('2', 'Product 2', 20)

const productRepoMock = (): ProductRepoInterface => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn()
  }
}

describe('Test List Product use case', () => {
  test('should list all products', async () => {
    const customerRepo = productRepoMock()
    jest.spyOn(customerRepo, 'findAll')
      .mockReturnValue(Promise.resolve([product1, product2]))

    const input: InputListProductDto = { }
    const usecase = new ListProductUseCase(customerRepo)

    const output: OutputListProductsDto = await usecase.execute(input)

    expect(output.products.length).toBe(2)

    expect(output.products[0].id).toBe(product1.id)
    expect(output.products[0].name).toBe(product1.name)
    expect(output.products[0].price).toBe(product1.price)

    expect(output.products[1].id).toBe(product2.id)
    expect(output.products[1].name).toBe(product2.name)
    expect(output.products[1].price).toBe(product2.price)
  })

  test('should returns product empty list', async () => {
    const customerRepo = productRepoMock()
    jest.spyOn(customerRepo, 'findAll').mockReturnValue(Promise.resolve([]))

    const input: InputListProductDto = { }
    const usecase = new ListProductUseCase(customerRepo)

    const output: OutputListProductsDto = await usecase.execute(input)

    expect(output.products.length).toBe(0)
  })
})
