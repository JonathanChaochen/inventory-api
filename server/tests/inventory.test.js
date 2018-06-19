const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const  Inventory  = require('./../models/inventory');

const inventory = [
  {
    _id: new ObjectID(),
    name: 'First test inventory'
  },
  {
    _id: new ObjectID(),
    name: 'Second test inventory'
  }
];

beforeEach(done => {
  Inventory.remove({})
    .then(() => {
      return Inventory.insertMany(inventory);
    })
    .then(() => done());
});

describe('POST /inventory', () => {
  it('should create a new inventory', done => {
    let name = 'Test inventory name';

    request(app)
      .post('/inventory')
      .send({ name })
      .expect(200)
      .expect(res => {
        expect(res.body.name).toBe(name);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Inventory.find({ name: 'Test inventory name' })
          .then(inventory => {
            expect(inventory.length).toBe(1);
            expect(inventory[0].name).toBe(name);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should not create inventory with invalid body data', done => {
    request(app)
      .post('/inventory')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Inventory.find()
          .then(inventory => {
            expect(inventory.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe('GET /inventory', () => {
  it('should get all inventory', done => {
    request(app)
      .get('/inventory')
      .expect(200)
      .expect(res => {
        expect(res.body.inventory.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /inventory/:id', () => {
  it('should get inventory doc', done => {
    request(app)
      .get(`/inventory/${inventory[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.inventory.text).toBe(inventory[0].text);
      })
      .end(done);
  });

  it('should return 404 if inventory not found', done => {
    request(app)
      .get(`/inventory/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', done => {
    request(app)
      .get('/inventory/123abc')
      .expect(404)
      .end(done);
  });
});
