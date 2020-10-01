const tradesPeopleRoutes = require('./tradesPeople');
const jobRoutes = require('./jobs');

module.exports = [
  ...tradesPeopleRoutes,
  ...jobRoutes
];
