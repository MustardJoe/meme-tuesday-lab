require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connects');
const mongoose = require('mongoose');
const Meme = require('../lib/models/Meme');

describe('meme routing and middleware', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('is a test to post a new meme', () => {
    return request(app)
      .post('/api/v1/memes')
      .send({ 
        top: 'shit, I would eat that',
        image: 'https://prods3.imgix.net/images/articles/2017_04/Feature-restaurant-butcher-bakery-shops2.jpg?auto=format%2Ccompress&ixjsv=2.2.3',
        bottom: 'Sandwich life'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'shit, I would eat that',
          image:'https://prods3.imgix.net/images/articles/2017_04/Feature-restaurant-butcher-bakery-shops2.jpg?auto=format%2Ccompress&ixjsv=2.2.3',
          bottom: 'Sandwich life',
          __v: 0
          
        });
      });

  });

  it('gets (an array of?) all the memes', async() => {
    const meme = await Meme.create({ image: 'rap bone url', bottom: 'oh shit' });

    return request(app)
      .get('/api/v1/memes')
      .then(res => {
        const memeJSON = JSON.parse(JSON.stringify(meme));
        expect(res.body).toEqual([memeJSON]);
      });
  });

  it('gets a specific meme by index number (of the array)', async() => {
    const meme = await Meme.create({ image: 'rap bone url', bottom: 'oh shit' });

    return request(app)
      .get(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          image: 'rap bone url',
          bottom: 'oh shoot',
          __v: 0
        });
      });
  });
});
