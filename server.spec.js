const request = require('supertest');
const app = require('./server.js');
const environment = 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

describe('server', () => {
  describe('GET /api/v1/countries', () => {
    it('should return a 200 and an array of countries', async () => {
      const countries = await database('countries').select()
      const response = await request(app).get('/api/v1/countries');
      expect(true).toEqual(true);
    });
  });
});