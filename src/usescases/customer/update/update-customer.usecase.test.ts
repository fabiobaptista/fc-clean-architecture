import CustomerFactory from '@/domain/customer/factory/customer.factory'
import CustomerRepoInterface from '@/domain/customer/repo/customer.repo.interface'
import Address from '@/domain/customer/value-objects/address'
import CustomerModel from '@/infra/customer/repo/sequelize/customer.model'
import CustomerRepo from '@/infra/customer/repo/sequelize/customer.repo'
import { Sequelize } from 'sequelize-typescript'
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from './update-customer.dto'
import UpdateCustomerUseCase from './update-customer.usecase'

const customerMock = CustomerFactory.create(
  'fabio',
  new Address('street', 1, 'city', 'zip')
)

describe('Test Integration Update Customer use case', () => {
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

  test('should update a customer', async () => {
    const customerRepo = new CustomerRepo()
    const updateCustomeruseCase = new UpdateCustomerUseCase(customerRepo)

    await customerRepo.create(customerMock)

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
