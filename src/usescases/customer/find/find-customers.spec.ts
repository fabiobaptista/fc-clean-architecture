import CustomerFactory from '@/domain/customer/factory/customer.factory'
import CustomerRepoInterface from '@/domain/customer/repo/customer.repo.interface'
import Address from '@/domain/customer/value-objects/address'
import { InputFindCustomerDto, OutputFindCustomerDto } from './find-customer.dto'
import FindCustomerUseCase from './find-customer.usecase'

const customerMock = CustomerFactory.create(
  'fabio',
  new Address('street', 1, 'city', 'zip')
)

const customerRepoMock = (): CustomerRepoInterface => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customerMock)),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn()
  }
}

describe('Test find Customer use case', () => {
  test('should find a customer', async () => {
    const customerRepo = customerRepoMock()
    const input: InputFindCustomerDto = { id: '123' }
    const usecase = new FindCustomerUseCase(customerRepo)
    const output: OutputFindCustomerDto = await usecase.execute(input)

    expect(output).toEqual({
      id: customerMock.id,
      name: customerMock.name,
      address: {
        street: customerMock.address.street,
        number: customerMock.address.number,
        city: customerMock.address.city,
        zip: customerMock.address.zip
      }
    })
  })
})
