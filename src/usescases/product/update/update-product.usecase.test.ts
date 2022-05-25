import { Sequelize } from 'sequelize-typescript'
import Product from '@/domain/product/entity/product'
import ProductModel from '@/infra/product/repo/sequelize/product.model'
import ProductRepo from '@/infra/product/repo/sequelize/product.repo'
import { InputUpdateProductDto, OutputUpdateProductDto } from './update-product.dto'
import UpdateProductUseCase from './update-product.usecase'

const productMock = new Product('1', 'Product 1', 10)

describe('Test Integration Update Product use case', () => {
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

  test('should update a product', async () => {
    const productRepo = new ProductRepo()
    const updateCustomeruseCase = new UpdateProductUseCase(productRepo)

    await productRepo.create(productMock)

    const input: InputUpdateProductDto = {
      id: productMock.id,
      name: 'Product update',
      price: 150
    }
    const output: OutputUpdateProductDto = await updateCustomeruseCase.execute(input)

    expect(input).toEqual({
      id: output.id,
      name: output.name,
      price: output.price
    })
  })
})
