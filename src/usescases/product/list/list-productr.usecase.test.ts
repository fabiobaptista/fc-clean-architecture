import Product from '@/domain/product/entity/product'
import ProductModel from '@/infra/product/repo/sequelize/product.model'
import ProductRepo from '@/infra/product/repo/sequelize/product.repo'
import { Sequelize } from 'sequelize-typescript'
import { InputListProductDto, OutputListProductsDto } from './list-product.dto'
import { ListProductUseCase } from './list-product.usecase'

const product1 = new Product('1', 'Product 1', 20)
const product2 = new Product('2', 'Product 2', 40)

describe('Test Integration List Product use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('should list all products', async () => {
    const customerRepo = new ProductRepo()

    await customerRepo.create(product1)
    await customerRepo.create(product2)

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

  test('should returns customer empty list', async () => {
    const customerRepo = new ProductRepo()

    const input: InputListProductDto = { }
    const usecase = new ListProductUseCase(customerRepo)

    const output: OutputListProductsDto = await usecase.execute(input)

    expect(output.products.length).toBe(0)
  })
})
