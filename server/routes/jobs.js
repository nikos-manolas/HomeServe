const Joi = require('joi');
const randomize = require('randomatic');

const getJobsRoute = {
  method: 'GET',
  path: '/jobs/available/{tradesPersonCode}',
  options: {
    validate: {
      params: Joi.object({
        tradesPersonCode: Joi.string().required()
      }),
      failAction: (request, h, err) => { console.error(err); throw err; }
    }
  },
  handler: async (request, h) => {
    try {
      const { mongo: { db }, params: { tradesPersonCode } } = request;
      const jobCollection = db.collection('jobs');
      const tradesPeopleJobsCollection = db.collection('tradesPeopleJobs');
      const tradePerson = await tradesPeopleJobsCollection.findOne({ code: tradesPersonCode }, { projection: { _id: 0 } });
      const jobsFound = tradePerson 
        ? await jobCollection.find({ jobId: { $in: tradePerson.jobs}}).toArray()
        : [];
      return { jobsFound };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};

const getAllJobsRoute = {
  method: 'GET',
  path: '/jobs/available',
  handler: async (request, h) => {
    try {
      const { mongo: { db } } = request;
      const jobCollection = db.collection('jobs');
      const jobsFound = await jobCollection.find({}).toArray()
      return { jobsFound };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};

const getUniqueJobId = async (jobsCollection) => {
  const jobId = randomize('A0', 12);
  const tradesPerson = await jobsCollection.findOne( { jobId });
  return tradesPerson
    ? await getUniqueJobId(jobsCollection)
    : jobId;
};

const postJobsRoute = {
  method: 'POST',
  path: '/jobs',
  options: {
    validate: {
      payload: Joi.object({
        name: Joi.string().required(),
        location: Joi.object({ type: Joi.string().required(), coordinates: Joi.array().required() }).required()
      }),
      failAction: (request, h, err) => { console.error(err); throw err; }
    }
  },
  handler: async (request, h) => {
    try {
      const { mongo: { db }, payload } = request;
      const { name, location } = payload;
      const jobsCollection = db.collection('jobs');
      const jobId = await getUniqueJobId(jobsCollection);
      await jobsCollection.insertOne({ name, location, jobId });
      console.log(`Created new job ${jobId} ${name}`);
  
      const tradesPeopleCollection = db.collection('tradesPeople');
      const tradesPeopleFound = await tradesPeopleCollection.find(
        {
          location:
            {
              $near:
               {
                 $geometry: location,
                 $minDistance: 10000000, // metres
                 $maxDistance: 50000000 // metres TODO
               }
            }
        }
      ).toArray();
      const tradesPeopleJobsCollection = db.collection('tradesPeopleJobs');
      const tradesPeopleFoundLength = tradesPeopleFound.length;
      for (let i = 0; i < tradesPeopleFoundLength; i++){
        const { code } = tradesPeopleFound[i];
        await tradesPeopleJobsCollection.updateOne(
          { code },
          { $push: { jobs: jobId } }
       )
        
      }
      return { jobId, name }
    } catch(err) {
      console.error(err);
      throw err;
    }
  }
};

module.exports = [
  getJobsRoute,
  postJobsRoute,
  getAllJobsRoute
]
