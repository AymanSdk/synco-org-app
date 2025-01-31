import { SwaggerOptions } from 'swagger-jsdoc';

const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Syncro Org API Documentation',
      version: '1.0.0',
      description: 'API documentation for Syncro Org application',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./src/**/*.ts', './convex/**/*.ts'],
};

export default swaggerOptions;
