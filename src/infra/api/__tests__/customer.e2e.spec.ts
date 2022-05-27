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

  test('should returns all customers in XML format', async () => {
    const input1 = {
      name: 'Fabio 1',
      address: {
        street: 'Street',
        number: 123,
        city: 'City',
        zip: 'Zip'
      }
    }

    await request(app).post('/customer').send(input1)

    const input2 = {
      name: 'Fabio 2',
      address: {
        street: 'Street',
        number: 123,
        city: 'City',
        zip: 'Zip'
      }
    }
    await request(app).post('/customer').send(input2)

    const { status, text }: {
      status: number
      text: string
    } = await request(app)
      .get('/customer')
      .set('Accept', 'application/xml')
      .send()

    console.log('text', text)
    expect(status).toBe(200)
    expect(text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(text).toContain('<customers>')
    expect(text).toContain('<customer>')
    expect(text).toContain(`<name>${input1.name}</name>`)
    expect(text).toContain('<address>')
    expect(text).toContain(`<street>${input1.address.street}</street>`)
    expect(text).toContain(`<city>${input1.address.city}</city>`)
    expect(text).toContain(`<number>${input1.address.number}</number>`)
    expect(text).toContain(`<zip>${input1.address.zip}</zip>`)
    expect(text).toContain('</address>')
    expect(text).toContain('</customer>')
    expect(text).toContain('</customers>')
    expect(text).toContain(`<name>${input2.name}</name>`)
  })
})
