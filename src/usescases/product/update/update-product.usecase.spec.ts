import Product from '@/domain/product/entity/product';
import ProductRepoInterface from '@/domain/product/repo/product.repo.interface';
import { InputUpdateProductDto, OutputUpdateProductDto } from './update-product.dto';
import UpdateProductUseCase from './update-product.usecase';

const productMock = new Product('1', 'Product 1', 10)

const productRepoMock = (): ProductRepoInterface => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn()
  }
}

describe('Test Update Product use case', () => {
  test('should update a product', async () => {
    const productRepo = productRepoMock()
    const updateProductUseCase = new UpdateProductUseCase(productRepo)

    const input: InputUpdateProductDto = {
      id: productMock.id,
      name: 'Product',
      price: 10
    }

    jest.spyOn(productRepo, 'find').mockReturnValue(Promise.resolve(productMock))

    const output: OutputUpdateProductDto = await updateProductUseCase.execute(input)

    expect(input).toEqual({
      id: output.id,
      name: output.name,
      price: output.price
    })
  })
})
