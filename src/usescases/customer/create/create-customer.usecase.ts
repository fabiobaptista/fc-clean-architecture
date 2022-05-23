import CustomerFactory from '@/domain/customer/factory/customer.factory'
import CustomerRepoInterface from '@/domain/customer/repo/customer.repo.interface'
import Address from '@/domain/customer/value-objects/address'
import { InputCreateCustomerDto, OutputCreateCustomerDto } from './create-customer.dto'

export default class CreateCustomerUseCase {
  private readonly customerRepo: CustomerRepoInterface
  constructor (customerRepo: CustomerRepoInterface) {
    this.customerRepo = customerRepo
  }

  async execute (input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.create(
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    )

    await this.customerRepo.create(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city
      }
    }
  }
}
