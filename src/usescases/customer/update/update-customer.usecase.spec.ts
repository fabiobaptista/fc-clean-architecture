import CustomerFactory from '@/domain/customer/factory/customer.factory'
import CustomerRepoInterface from '@/domain/customer/repo/customer.repo.interface'
import Address from '@/domain/customer/value-objects/address'
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from './update-customer.dto'
import UpdateCustomerUseCase from './update-customer.usecase'

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

describe('Test Update Customer use case', () => {
  test('should update a customer', async () => {
    const customerRepo = customerRepoMock()
    const updateCustomeruseCase = new UpdateCustomerUseCase(customerRepo)

    const input: InputUpdateCustomerDto = {
      id: customerMock.id,
      name: 'Fabio update',
      address: {
        street: 'Street update',
        number: 9,
        zip: 'Zip update',
        city: 'City update'
      }
    }

    jest.spyOn(customerRepo, 'find').mockReturnValue(Promise.resolve(customerMock))

    const output: OutputUpdateCustomerDto = await updateCustomeruseCase.execute(input)

    expect(input).toEqual({
      id: output.id,
      name: output.name,
      address: {
        street: output.address.street,
        number: output.address.number,
        zip: output.address.zip,
        city: output.address.city
      }
    })
  })
})
