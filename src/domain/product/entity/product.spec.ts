import Product from './product'

describe('Product unit test', () => {
  test('should throw error when id is empty', () => {
    expect(() => {
      void new Product('', 'Product', 10)
    })
      .toThrowError('product: Id is required')
  })

  test('should throw error when name is empty', () => {
    expect(() => {
      void new Product('1', '', 10)
    })
      .toThrowError('product: Name is required')
  })

  test('should throw error when price is less than zero', () => {
    expect(() => {
      void new Product('1', 'Product', -1)
    })
      .toThrowError('product: Price must be greater than zero')
  })

  test('should throw error when Id and Name is empty', () => {
    expect(() => {
      void new Product('', '', 10)
    })
      .toThrowError('product: Id is required,product: Name is required')
  })

  test('should change name', () => {
    const newName = 'New Product Name'
    const product = new Product('1', 'Product', 10)

    product.changeName(newName)

    expect(product.name).toBe(newName)
  })

  test('should change price', () => {
    const newPrice = 20
    const product = new Product('1', 'Product', 10)

    product.changePrice(newPrice)

    expect(product.price).toBe(newPrice)
  })

  test('should throw error when new price is less than zero', () => {
    expect(() => {
      const newPrice = -1
      const product = new Product('1', 'Product', 10)

      product.changePrice(newPrice)
    })
      .toThrowError('product: Price must be greater than zero')
  })
})
