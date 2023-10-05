import request from 'supertest'
import { getStatistic } from './get' // Import your Express app instance

describe('Express App', () => {
  it('should respond with "Hello, World!"', async () => {
    const response = await request(getStatistic).get('/statistic')
    expect(response.status).toBe(200)
    expect(response.text).toContain('Hello, World!')
  })
})
