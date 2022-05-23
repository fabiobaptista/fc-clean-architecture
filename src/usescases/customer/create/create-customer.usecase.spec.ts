import CustomerFactory from '@/domain/customer/factory/customer.factory'
import CustomerRepoInterface from '@/domain/customer/repo/customer.repo.interface'
import Address from '@/domain/customer/value-objects/address'
import { InputCreateCustomerDto } from './create-customer.dto'
import CreateCustomerUseCase from './create-customer.usecase'

const customerMock = CustomerFactory.create(
  'fabio',
  new Address('street', 1, 'city', 'zip')
)

const customerRepoMock = (): CustomerRepoInterface => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn()
  }
}

describe('Test Create Customer use case', () => {
  test('should create a customer', async () => {
    const customerRepo = customerRepoMock()
    jest.spyOn(customerRepo, 'create').mockReturnValue(Promise.resolve())

    const input: InputCreateCustomerDto = {
      name: customerMock.name,
      address: {
        street: customerMock.address.street,
        number: customerMock.address.number,
        zip: customerMock.address.zip,
        city: customerMock.address.city
      }
    }
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepo)

    const output = await createCustomerUseCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city
      }
    })
  })

  test('should create a customer', async () => {
    const customerRepo = customerRepoMock()

    const input: InputCreateCustomerDto = {
      name: customerMock.name,
      address: {
        street: customerMock.address.street,
        number: customerMock.address.number,
        zip: customerMock.address.zip,
        city: customerMock.address.city
      }
    }
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepo)

    input.name = ''

    await expect(createCustomerUseCase.execute(input))
      .rejects.toThrow('Name is required')
  })

  test('should create a customer', async () => {
    const customerRepo = customerRepoMock()

    const input: InputCreateCustomerDto = {
      name: customerMock.name,
      address: {
        street: customerMock.address.street,
        number: customerMock.address.number,
        zip: customerMock.address.zip,
        city: customerMock.address.city
      }
    }
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepo)

    input.address.street = ''

    await expect(createCustomerUseCase.execute(input))
      .rejects.toThrow('Street is required')
  })
})
