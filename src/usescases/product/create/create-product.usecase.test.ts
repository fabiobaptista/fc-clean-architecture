import { Sequelize } from 'sequelize-typescript'
import Product from '@/domain/product/entity/product'
import ProductModel from '@/infra/product/repo/sequelize/product.model'
import ProductRepo from '@/infra/product/repo/sequelize/product.repo'
import { InputCreateProductDto, OutputCreateProductDto } from './create-product.dto'
import CreateProductUseCase from './create-product.usecase'

const productMock = new Product('1', 'Product 1', 10)

describe('Test Integration Create Product use case', () => {
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

  test('should create a product', async () => {
    const productRepo = new ProductRepo()

    const input: InputCreateProductDto = {
      id: productMock.id,
      name: productMock.name,
      price: productMock.price
    }
    const createProdcutUseCase = new CreateProductUseCase(productRepo)

    const output: OutputCreateProductDto = await createProdcutUseCase.execute(input)

    expect(output).toEqual({
      id: input.id,
      name: input.name,
      price: input.price
    })
  })
})
