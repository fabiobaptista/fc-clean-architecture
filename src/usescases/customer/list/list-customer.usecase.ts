import Customer from '@/domain/customer/entity/customer'
import CustomerRepoInterface from '@/domain/customer/repo/customer.repo.interface'
import { InputListCustomerDto, OutputListCustomerDto, OutputListCustomersDto } from './list-customer.dto'

export class ListCustomerUseCase {
  private readonly customerRepo: CustomerRepoInterface
  constructor (customerRepo: CustomerRepoInterface) {
    this.customerRepo = customerRepo
  }

  async execute (input: InputListCustomerDto): Promise<OutputListCustomersDto> {
    const list = await this.customerRepo.findAll()
    const customers = list.map((c: Customer): OutputListCustomerDto => ({
      id: c.id,
      name: c.name,
      address: {
        street: c.address.street,
        number: c.address.number,
        zip: c.address.zip,
        city: c.address.city

      }
    }))
    return { customers }
  }
}
