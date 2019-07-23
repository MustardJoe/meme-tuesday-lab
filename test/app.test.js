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
        top: 'yummy',
        image: 'https://prods3.imgix.net/images/articles/2017_04/Feature-restaurant-butcher-bakery-shops2.jpg?auto=format%2Ccompress&ixjsv=2.2.3',
        bottom: 'Sandwich life'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'yummy',
          image:'https://prods3.imgix.net/images/articles/2017_04/Feature-restaurant-butcher-bakery-shops2.jpg?auto=format%2Ccompress&ixjsv=2.2.3',
          bottom: 'Sandwich life',
          __v: 0
          
        });
      });

  });

  // it('gets (an array of?) all the memes', async() => {
  //   const meme = await Meme.create({ image: 'rap bone url', bottom: 'oh shucks' });

  //   return request(app)
  //     .get('/api/v1/memes')
  //     .then(res => {
  //       const memeJSON = JSON.parse(JSON.stringify(meme));
  //       expect(res.body).toEqual([memeJSON]);
  //     });
  // });

  // it('gets a specific meme by index number (of the array)', async() => {
  //   const meme = await Meme.create({ image: 'rap bone url', bottom: 'oh shucks' });

  //   return request(app)
  //     .get(`/api/v1/memes/${meme._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: expect.any(String),
  //         image: 'rap bone url',
  //         bottom: 'oh shucks',
  //         __v: 0
  //       });
  //     });
  // });

  // it('can PUT to update a meme', async() => {
  //   const meme = await Meme.create({
  //     image: 'pic of grumpy cat',
  //     bottom: 'my face is stuck this way'
  //   });

  //   return request(app)
  //     .put(`/api/v1/memes/${meme._id}`)
  //     .send({
  //       bottom: 'give me food',
  //     })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: expect.any(String),
  //         image: 'pic of grumpy cat',
  //         bottom: 'give me food',
  //         __v: 0,
  //       });
  //     });
  // });

  // it('deletes a meme by index numb', async() => {
  //   const meme = await Meme.create({ image: 'squid', bottom:'bail out the boat' });
  //   console.log(meme);

  //   return request(app)
  //     .delete(`/api/v1/memes/${meme._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: expect.any(String),
  //         image: meme.image,
  //         bottom: meme.bottom,
  //         __v: 0
  //       });
  //     });
  // });
});
