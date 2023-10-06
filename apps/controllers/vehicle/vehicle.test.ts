import request from 'supertest'
import { app } from '../../../app'

describe('vehicle test', () => {
  it('should respond with status code 200"', async () => {
    const response = await request(app).get('/api/v1/vehicles')
    expect(response.statusCode).toBe(200)
    // expect(response.text).toContain()
  })
})
