import request from 'supertest'
import { route } from '../routes'

describe('Statistic', () => {
  it('should respond with status code 200"', async () => {
    const response = await request(route).get('http://localhost:8000/statistic')
    expect(response.statusCode).toBe(200)
    // expect(response.text).toContain()
  })
})
