import { app, sequelize } from '../express'
import request from 'supertest'
import { InputCreateProductDto } from '@/usescases/product/create/create-product.dto'
import { OutputListProductsDto } from '@/usescases/product/list/list-product.dto'

describe('E2E test to Product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test('should create a product', async () => {
    const input: InputCreateProductDto = {
      id: '1',
      name: 'Product',
      price: 100
    }
    const { status, body }: {
      status: number
      body: InputCreateProductDto
    } = await request(app).post('/product').send(input)

    expect(status).toBe(200)
    expect(body.id).toBe(input.id)
    expect(body.name).toBe(input.name)
    expect(body.price).toBe(input.price)
  })

  test('should not create a product', async () => {
    const input: InputCreateProductDto = {
      id: '',
      name: 'Product',
      price: 100
    }
    const { status }: {
      status: number
    } = await request(app).post('/product').send(input)

    expect(status).toBe(500)
  })

  test('should list all products', async () => {
    {
      const input: InputCreateProductDto = {
        id: '1',
        name: 'Product',
        price: 100
      }
      const { status, body }: {
        status: number
        body: InputCreateProductDto
      } = await request(app).post('/product').send(input)

      expect(status).toBe(200)
      expect(body.id).toBe(input.id)
    }

    {
      const input: InputCreateProductDto = {
        id: '2',
        name: 'Product',
        price: 100
      }
      const { status, body }: {
        status: number
        body: InputCreateProductDto
      } = await request(app).post('/product').send(input)

      expect(status).toBe(200)
      expect(body.id).toBe(input.id)
    }

    const { status, body }: {
      status: number
      body: OutputListProductsDto
    } = await request(app).get('/product').send()

    expect(status).toBe(200)
    expect(body.products.length).toBe(2)
  })
})
