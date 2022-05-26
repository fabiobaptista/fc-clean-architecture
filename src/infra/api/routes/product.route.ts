import ProductRepo from '@/infra/product/repo/sequelize/product.repo'
import { InputCreateProductDto, OutputCreateProductDto } from '@/usescases/product/create/create-product.dto'
import CreateProductUseCase from '@/usescases/product/create/create-product.usecase'
import { OutputListProductsDto } from '@/usescases/product/list/list-product.dto'
import { ListProductUseCase } from '@/usescases/product/list/list-product.usecase'
import express, { Router, Request, Response } from 'express'

export const productRoute: Router = express.Router()

productRoute.get('/', async (req: Request, res: Response): Promise<void> => {
  const usecase = new ListProductUseCase(new ProductRepo())
  try {
    const output: OutputListProductsDto = await usecase.execute({})

    res.status(200).send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})

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
