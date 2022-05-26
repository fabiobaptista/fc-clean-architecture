import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test to Customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test('should create a customer', async () => {
    const input = {
      name: 'John Doe',
      address: {
        street: 'Street',
        number: 123,
        city: 'City',
        zip: 'Zip'
      }
    }
    const response = await request(app)
      .post('/customer')
      .send(input)

    expect(response.status).toBe(200)
    expect(response.body.name).toBe(input.name)
  })
})
