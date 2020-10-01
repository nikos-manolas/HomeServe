const Joi = require('joi');
const randomize = require('randomatic');

const getTradesPeopleRoute = {
  method: 'GET',
  path: '/tradesPeople/{code}',
  options: {
    tags: ['api'],
    validate: {
      params: Joi.object({
        code: Joi.string().required()
      }),
      failAction: (request, h, err) => { console.error(err); throw err; }
    }
  },
  handler: async (request, h) => {
    const { mongo: { db }, params: { code } } = request;
    const tradesPeopleCollection = db.collection('tradesPeople');
    return tradesPeopleCollection.findOne({ code }, { projection: { _id: 0 } });
  }
};

const getUniqueCode = async (tradesPeopleCollection) => {
  const code = `${randomize('A', 1)}${randomize('0', 6)}`;
  const tradesPerson = await tradesPeopleCollection.findOne( { code });
  return tradesPerson
    ? await getUniqueCode(tradesPeopleCollection)
    : code;
};

const postTradesPeopleRoute = {
  method: 'POST',
  path: '/tradesPeople',
  options: {
    tags: ['api'],
    validate: {
      payload: Joi.object({
        name: { firstName: Joi.string().required(), surname: Joi.string().required() },
        trade: { 
          id: Joi.number().required(),
          type: Joi.string().required()
        },
        address: {
          addressLine1: Joi.string().required(),
          addressLine2: Joi.string().required(),
          city: Joi.string().required(),
          county: Joi.string(),
          postCode: Joi.string().required()
        },
        location: {
          type: Joi.string().required(),
          coordinates: Joi.array().required()
        },
        phoneNumber: Joi.string().required(),
        email: Joi.string().email().required(),
        rating: Joi.number(),
        isAvailableForWork: Joi.boolean().required()
      }),
      failAction: (request, h, err) => { console.error(err); throw err; }
    }
  },
  handler: async (request, h) => {
    const { mongo: { db }, payload } = request;
    const tradesPeopleCollection = db.collection('tradesPeople');
    const code = await getUniqueCode(tradesPeopleCollection);
    const createdAt = new Date();
    await tradesPeopleCollection.insertOne({ ...payload, code, createdAt });
    const tradesPeopleJobsCollection = db.collection('tradesPeopleJobs');
    await tradesPeopleJobsCollection.insertOne({ code, jobs: [], createdAt });

    console.log(`Created new tradesPerson ${code}`);
    return { code }
  }
};

module.exports = [
  getTradesPeopleRoute,
  postTradesPeopleRoute
]
