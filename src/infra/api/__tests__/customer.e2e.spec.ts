import { app, sequelize } from '../express'
import request from 'supertest'
import { OutputListCustomersDto } from '@/usescases/customer/list/list-customer.dto'
import { OutputCreateCustomerDto } from '@/usescases/customer/create/create-customer.dto'

describe('E2E test to Customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test('should create a customer', async () => {
    const input = {
      name: 'Fabio',
      address: {
        street: 'Street',
        number: 123,
        city: 'City',
        zip: 'Zip'
      }
    }
    const { status, body }: {
      status: number
      body: OutputCreateCustomerDto
    } = await request(app).post('/customer').send(input)

    expect(status).toBe(200)
    expect(body.name).toBe(input.name)
    expect(body.address.street).toBe(input.address.street)
    expect(body.address.number).toBe(input.address.number)
    expect(body.address.city).toBe(input.address.city)
    expect(body.address.zip).toBe(input.address.zip)
  })

  test('should not create a customer', async () => {
    const input = {
      address: {
        street: 'Street',
        number: 123,
        city: 'City',
        zip: 'Zip'
      }
    }
    const { status }: {
      status: number
    } = await request(app).post('/customer').send(input)

    expect(status).toBe(500)
  })

  test('should list all customers', async () => {
    {
      const input = {
        name: 'Fabio 1',
        address: {
          street: 'Street',
          number: 123,
          city: 'City',
          zip: 'Zip'
        }
      }
      const { status, body }: {
        status: number
        body: OutputCreateCustomerDto
      } = await request(app).post('/customer').send(input)

      expect(status).toBe(200)
      expect(body.name).toBe(input.name)
    }

    {
      const input = {
        name: 'Fabio 2',
        address: {
          street: 'Street',
          number: 123,
          city: 'City',
          zip: 'Zip'
        }
      }
      const { status, body }: {
        status: number
        body: OutputCreateCustomerDto
      } = await request(app)
        .post('/customer')
        .send(input)

      expect(status).toBe(200)
      expect(body.name).toBe(input.name)
    }

    const { status, body }: {
      status: number
      body: OutputListCustomersDto
    } = await request(app).get('/customer').send()

    expect(status).toBe(200)
    expect(body.customers.length).toBe(2)
  })
})
