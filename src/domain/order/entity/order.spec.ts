import Order from './order'
import OrderItem from './order-item'

describe('Order unit test', () => {
  test ('should throw error when id is empty', () => {
    expect(() => {
      void new Order('', '1', [])
    }).toThrowError('Id is required')
  })

  test ('should throw error when customerId is empty', () => {
    expect(() => {
      void new Order('1', '', [])
    }).toThrowError('CustomerId is required')
  })

  test ('should throw error when customerId is empty', () => {
    expect(() => {
      void new Order('1', '1', [])
    }).toThrowError('Items are required')
  })

  test ('should calculate total', () => {
    const item = new OrderItem('1', 'Item 1', 100, '1', 2)
    const item2 = new OrderItem('2', 'Item 2', 200, '2', 2)
    const order = new Order('1', '1', [item])

    let total = order.total()

    expect(order.total()).toBe(200)

    const order2 = new Order('1', '1', [item, item2])

    total = order2.total()

    expect(total).toBe(600)
  })

  test ('should throw error if the item qte is less or equal zero 0', () => {
    expect(() => {
      void new Order('1', '1', [new OrderItem('1', 'Item 1', 100, '1', 0)])
    }).toThrowError('Quantity must be greater than 0')
  })
})
