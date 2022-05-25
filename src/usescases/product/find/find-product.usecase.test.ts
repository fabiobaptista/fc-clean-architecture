import Product from '@/domain/product/entity/product'
import ProductModel from '@/infra/product/repo/sequelize/product.model'
import ProductRepo from '@/infra/product/repo/sequelize/product.repo'
import { Sequelize } from 'sequelize-typescript'
import { InputFindProductDto } from './find-product.dto'
import FindProductUseCase from './find-product.usecase'

const productMock = new Product('1', 'Product 1', 10)

describe('Test Integration Find Product use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('should find a product', async () => {
    const productRepo = new ProductRepo()

    await productRepo.create(productMock)

    const findProductUseCase = new FindProductUseCase(productRepo)
    const input: InputFindProductDto = { id: productMock.id }

    const output = await findProductUseCase.execute(input)

    expect(output).toEqual({
      id: productMock.id,
      name: productMock.name,
      price: productMock.price
    })
  })

  test('should receive a error if not found a product', async () => {
    const productRepo = new ProductRepo()
    const input: InputFindProductDto = { id: '123' }
    const usecase = new FindProductUseCase(productRepo)

    void expect(async () => await usecase.execute(input))
      .rejects.toThrow('Product not found')
  })
})
