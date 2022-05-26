import express, { Router, Request, Response } from 'express'
import CustomerRepo from '@/infra/customer/repo/sequelize/customer.repo'
import CreateCustomerUseCase from '@/usescases/customer/create/create-customer.usecase'
import ListCustomerUseCase from '@/usescases/customer/list/list-customer.usecase'
import { InputCreateCustomerDto, OutputCreateCustomerDto } from '@/usescases/customer/create/create-customer.dto'
import { OutputListCustomersDto } from '@/usescases/customer/list/list-customer.dto'

export const customerRoute: Router = express.Router()

customerRoute.get('/', async (req: Request, res: Response): Promise<void> => {
  const usecase = new ListCustomerUseCase(new CustomerRepo())
  try {
    const output: OutputListCustomersDto = await usecase.execute({})

    res.status(200).send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})

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

    res.status(200).send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})
