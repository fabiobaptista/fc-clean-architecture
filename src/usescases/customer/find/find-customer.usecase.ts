import CustomerRepoInterface from '@/domain/customer/repo/customer.repo.interface'
import { InputFindCustomerDto, OutputFindCustomerDto } from './find-customer.dto'

export default class FindCustomerUseCase {
  private readonly customerRepo: CustomerRepoInterface
  constructor (customerRepo: CustomerRepoInterface) {
    this.customerRepo = customerRepo
  }

  async execute (input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepo.find(input.id)

    const output: OutputFindCustomerDto = {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        zip: customer.address.zip
      }
    }

    return await Promise.resolve(output)
  }
}
