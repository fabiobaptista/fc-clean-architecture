import Product from '@/domain/product/entity/product'
import ProductRepoInterface from '@/domain/product/repo/product.repo.interface'
import { InputFindProductDto, OutputFindProductDto } from './find-product.dto'
import FindProductUseCase from './find-product.usecase'

const productMock = new Product('1', 'Product 1', 10)

const productRepoMock = (): ProductRepoInterface => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn()
  }
}

describe('Test Find Product use case', () => {
  test('should find a product', async () => {
    const productRepo = productRepoMock()
    jest.spyOn(productRepo, 'find').mockReturnValue(Promise.resolve(productMock))
    const input: InputFindProductDto = { id: '1' }
    const usecase = new FindProductUseCase(productRepo)
    const output: OutputFindProductDto = await usecase.execute(input)

    expect(output).toEqual({
      id: productMock.id,
      name: productMock.name,
      price: productMock.price
    })
  })

  test('should receive a error if not found a product', async () => {
    const customerRepo = productRepoMock()
    const input: InputFindProductDto = { id: '1' }
    const usecase = new FindProductUseCase(customerRepo)

    jest.spyOn(customerRepo, 'find').mockImplementation(() => {
      throw new Error('Product not found')
    })

    void expect(async () => await usecase.execute(input))
      .rejects.toThrow('Product not found')
  })
})
