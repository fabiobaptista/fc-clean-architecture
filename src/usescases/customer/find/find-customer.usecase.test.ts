import { Sequelize } from 'sequelize-typescript'
import CustomerFactory from '@/domain/customer/factory/customer.factory'
import Address from '@/domain/customer/value-objects/address'
import CustomerRepo from '@/infra/customer/repo/sequelize/customer.repo'
import CustomerModel from '@/infra/customer/repo/sequelize/customer.model'
import FindCustomerUseCase from './find-customer.usecase'
import { InputFindCustomerDto } from './find-customer.dto'

const customerMock = CustomerFactory.create(
  'fabio',
  new Address('street', 1, 'city', 'zip')
)

describe('Test Integration Create Customer use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('should find a customer', async () => {
    const customerRepo = new CustomerRepo()

    await customerRepo.create(customerMock)
    const findCustomerUseCase = new FindCustomerUseCase(customerRepo)
    const input: InputFindCustomerDto = { id: customerMock.id }

    const output = await findCustomerUseCase.execute(input)

    expect(output).toEqual({
      id: customerMock.id,
      name: customerMock.name,
      address: {
        street: customerMock.address.street,
        number: customerMock.address.number,
        zip: customerMock.address.zip,
        city: customerMock.address.city
      }
    })
  })

  // test('should create a customer', async () => {
  //   const customerRepo = new CustomerRepo()

  //   const input: InputCreateCustomerDto = {
  //     name: customerMock.name,
  //     address: {
  //       street: customerMock.address.street,
  //       number: customerMock.address.number,
  //       zip: customerMock.address.zip,
  //       city: customerMock.address.city
  //     }
  //   }
  //   const createCustomerUseCase = new CreateCustomerUseCase(customerRepo)

  //   input.name = ''

  //   await expect(createCustomerUseCase.execute(input))
  //     .rejects.toThrow('Name is required')
  // })

  // test('should create a customer', async () => {
  //   const customerRepo = new CustomerRepo()

  //   const input: InputCreateCustomerDto = {
  //     name: customerMock.name,
  //     address: {
  //       street: customerMock.address.street,
  //       number: customerMock.address.number,
  //       zip: customerMock.address.zip,
  //       city: customerMock.address.city
  //     }
  //   }
  //   const createCustomerUseCase = new CreateCustomerUseCase(customerRepo)

  //   input.address.street = ''

  //   await expect(createCustomerUseCase.execute(input))
  //     .rejects.toThrow('Street is required')
  // })
})
