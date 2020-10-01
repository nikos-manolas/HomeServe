db.createCollection('tradesPeople');
db.createCollection('tradeTypes');
db.createCollection('jobs');
db.createCollection('tradesPeopleJobs');

db.createUser({
  user: 'user',
  pwd: 'userPassword',
  roles: [
    {
      role: 'readWrite',
      db: 'homeserve',
    },
  ],
});

db.jobs.insertOne({
  jobId: 'A454544',
  name: 'Woodwork required',
  type: 'Carpenting',
  available: true,
  location:  { type: "Point", coordinates: [ 52.528308, -0.3817833 ] },
  createdAt: new Date()
});

db.jobs.insertOne({
  jobId: 'A454545',
  name: 'Wall painting',
  type: 'Painting',
  available: true,
  location:  { type: "Point", coordinates: [ 51, -0.3817833 ] },
  createdAt: new Date()
});

db.jobs.insertOne({
  jobId: 'A454546',
  name: 'Gardening',
  type: 'Gardening',
  available: true,
  location:  { type: "Point", coordinates: [ 52, -0.3817833 ] },
  createdAt: new Date()
});

db.jobs.insertOne({
  jobId: 'A454547',
  name: 'Electrical wiring',
  type: 'Electrical',
  available: true,
  location:  { type: "Point", coordinates: [ 51.5194, 0.1270 ] },
  createdAt: new Date()
});

db.tradesPeopleJobs.insertOne({
  code: 'A013456',
  jobs: ['A454544', 'A454545', 'A454546', 'A454547']
})

db.tradesPeople.insertOne({
  name: { firstName: 'John', surname: 'Williams' },
  code: 'A013456',
  trade: { 
    id: 1,
    type: 'Carpenter'
  },
  location: {
    type: 'Point',
    coordinates: [51.507351, -0.127758]
  },
  address: {
    addressLine1: 'Flat 35, Lowes court',
    addressLine2: 'High Road',
    city: 'London',
    county: '',
    postCode: 'N43AU',
  },
  phoneNumber: '07567384901',
  email: 'john.williams@carpenter.co.uk',
  rating: 4.5,
  isAvailableForWork: true,
  createdAt: new Date()
});
db.jobs.createIndex( { location: "2dsphere" } );
db.tradesPeople.createIndex( { location: "2dsphere" } );


db.tradeTypes.insertMany([{ id: 1, type: 'Carpenter' }, { id: 2, type: 'Handyman' }, { id: 3, type: 'Painter' }, { id: 4, type: 'Gardener' }]);
