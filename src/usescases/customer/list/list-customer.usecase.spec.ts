import CustomerFactory from '@/domain/customer/factory/customer.factory'
import CustomerRepoInterface from '@/domain/customer/repo/customer.repo.interface'
import Address from '@/domain/customer/value-objects/address'
import { InputListCustomerDto, OutputListCustomersDto } from './list-customer.dto'
import ListCustomerUseCase from './list-customer.usecase'

const customer1 = CustomerFactory.create(
  'Fabio 1',
  new Address('Street 1', 1, 'Zip 1', 'City 1')
)

const customer2 = CustomerFactory.create(
  'Fabio 2',
  new Address('Street 2', 2, 'Zip 2', 'City 2')
)

const customerRepoMock = (): CustomerRepoInterface => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn()
  }
}

describe('Test List Customer use case', () => {
  test('should list all customers', async () => {
    const customerRepo = customerRepoMock()
    jest.spyOn(customerRepo, 'findAll')
      .mockReturnValue(Promise.resolve([customer1, customer2]))

    const input: InputListCustomerDto = { }
    const usecase = new ListCustomerUseCase(customerRepo)

    const output: OutputListCustomersDto = await usecase.execute(input)

    expect(output.customers.length).toBe(2)

    expect(output.customers[0].id).toBe(customer1.id)
    expect(output.customers[0].name).toBe(customer1.name)
    expect(output.customers[0].address.street).toBe(customer1.address.street)

    expect(output.customers[1].id).toBe(customer2.id)
    expect(output.customers[1].name).toBe(customer2.name)
    expect(output.customers[1].address.street).toBe(customer2.address.street)
  })

  test('should returns customer empty list', async () => {
    const customerRepo = customerRepoMock()
    jest.spyOn(customerRepo, 'findAll').mockReturnValue(Promise.resolve([]))

    const input: InputListCustomerDto = { }
    const usecase = new ListCustomerUseCase(customerRepo)

    const output: OutputListCustomersDto = await usecase.execute(input)

    expect(output.customers.length).toBe(0)
  })
})
