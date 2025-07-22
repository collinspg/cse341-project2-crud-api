const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'User Api',
    description: 'User Api',
  },
  host: 'localhost:3000',
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
