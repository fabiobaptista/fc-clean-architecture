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
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn()
  }
}

describe('Test Find Customer use case', () => {
  test('should find a customer', async () => {
    const customerRepo = customerRepoMock()
    jest.spyOn(customerRepo, 'find').mockReturnValue(Promise.resolve(customerMock))
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

  test('should receive a error if not found a customer', async () => {
    const customerRepo = customerRepoMock()
    const input: InputFindCustomerDto = { id: '123' }
    const usecase = new FindCustomerUseCase(customerRepo)

    jest.spyOn(customerRepo, 'find').mockImplementation(() => {
      throw new Error('Customer not found')
    })

    void expect(async () => await usecase.execute(input))
      .rejects.toThrow('Customer not found')
  })
})
