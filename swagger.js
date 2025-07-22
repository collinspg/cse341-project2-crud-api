const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'User Api',
        description: 'User Api',
    },
    host: 'cse341-project2-crud-api.onrender.com',
     schemes: ['https', 'http'],

};

const outputFile = './swagger.json';
const endpointsFiles = [
    './app.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc);