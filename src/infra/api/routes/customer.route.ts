import CustomerRepo from '@/infra/customer/repo/sequelize/customer.repo'
import { InputCreateCustomerDto, OutputCreateCustomerDto } from '@/usescases/customer/create/create-customer.dto'
import CreateCustomerUseCase from '@/usescases/customer/create/create-customer.usecase'
import express, { Router, Request, Response } from 'express'

export const customerRoute: Router = express.Router()

customerRoute.post('/', async (req: Request, res: Response): Promise<void> => {
  const usecase = new CreateCustomerUseCase(new CustomerRepo())
  try {
    const input: InputCreateCustomerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zip: req.body.address.zip
      }
    }

    const output: OutputCreateCustomerDto = await usecase.execute(input)

    res
      .status(200)
      .send(output)
  } catch (error) {
    res
      .status(500)
      .send(error)
  }
})
