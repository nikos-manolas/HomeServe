const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const PORT = 4000;
const HOST = '0.0.0.0';
const config = require('../config.json');

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOST,
    routes: {
      cors: true
    }
  });

  const dbOpts = {
    url: config.MONGO_DB_URI,
    settings: {
        poolSize: 10
    },
    decorate: true
  };

  await server.register({
    plugin: require('hapi-mongodb'),
    options: dbOpts
});

  server.route(routes);
  await server.start();
  console.log('Server running at:', server.info.uri);
};

init();

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
