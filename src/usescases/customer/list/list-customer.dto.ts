export interface OutputListCustomerDto {
  id: string
  name: string
  address: {
    street: string
    number: number
    zip: string
    city: string
  }
}

export interface InputListCustomerDto {}

export interface OutputListCustomersDto {
  customers: OutputListCustomerDto[]
}
