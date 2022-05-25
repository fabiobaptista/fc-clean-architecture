import Product from '@/domain/product/entity/product'
import ProductRepoInterface from '@/domain/product/repo/product.repo.interface'
import { InputCreateProductDto } from './create-product.dto'
import CreateProductUseCase from './create-product.usecase'

const productMock = new Product('1', 'Product 1', 10)

const productRepoMock = (): ProductRepoInterface => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn()
  }
}

describe('Test Create Product use case', () => {
  test('should create a product', async () => {
    const productRepo = productRepoMock()
    jest.spyOn(productRepo, 'create').mockReturnValue(Promise.resolve())

    const input: InputCreateProductDto = {
      id: productMock.id,
      name: productMock.name,
      price: productMock.price
    }
    const createProductUseCase = new CreateProductUseCase(productRepo)

    const output = await createProductUseCase.execute(input)

    expect(output).toEqual({
      id: input.id,
      name: input.name,
      price: input.price
    })
  })

  test('should receive a error if id is empty', async () => {
    const productRepo = productRepoMock()

    const input: InputCreateProductDto = {
      id: '',
      name: productMock.name,
      price: productMock.price
    }
    const createProductUseCase = new CreateProductUseCase(productRepo)

    await expect(createProductUseCase.execute(input))
      .rejects.toThrow('Id is required')
  })

  test('should receive a error if name is empty', async () => {
    const productRepo = productRepoMock()

    const input: InputCreateProductDto = {
      id: productMock.id,
      name: '',
      price: productMock.price
    }
    const createProductUseCase = new CreateProductUseCase(productRepo)

    await expect(createProductUseCase.execute(input))
      .rejects.toThrow('Name is required')
  })

  test('should receive a error if price is less zero', async () => {
    const productRepo = productRepoMock()

    const input: InputCreateProductDto = {
      id: productMock.id,
      name: productMock.name,
      price: -1
    }
    const createProductUseCase = new CreateProductUseCase(productRepo)

    await expect(createProductUseCase.execute(input))
      .rejects.toThrow('Price must be greater than zero')
  })
})
