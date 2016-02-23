var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'webapp-reporter-2016'
    },
    port: 3000,
    db: 'mongodb://localhost/webapp-reporter-2016-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'webapp-reporter-2016'
    },
    port: 3000,
    db: 'mongodb://localhost/webapp-reporter-2016-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'webapp-reporter-2016'
    },
    port: 3000,
    db: 'mongodb://localhost/webapp-reporter-2016-production'
  }
};

module.exports = config[env];
