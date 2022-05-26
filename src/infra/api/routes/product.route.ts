import ProductRepo from '@/infra/product/repo/sequelize/product.repo'
import { InputCreateProductDto, OutputCreateProductDto } from '@/usescases/product/create/create-product.dto'
import CreateProductUseCase from '@/usescases/product/create/create-product.usecase'
import express, { Router, Request, Response } from 'express'

export const productRoute: Router = express.Router()

productRoute.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const usecase = new CreateProductUseCase(new ProductRepo())

    const input: InputCreateProductDto = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price
    }

    const output: OutputCreateProductDto = await usecase.execute(input)

    res.status(200).send(output)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

// customerRoute.post('/', async (req: Request, res: Response): Promise<void> => {
//   const usecase = new CreateCustomerUseCase(new CustomerRepo())
//   try {
//     const input: InputCreateCustomerDto = {
//       name: req.body.name,
//       address: {
//         street: req.body.address.street,
//         number: req.body.address.number,
//         city: req.body.address.city,
//         zip: req.body.address.zip
//       }
//     }

//     const output: OutputCreateCustomerDto = await usecase.execute(input)

//     res.status(200).send(output)
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })
