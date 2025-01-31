'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import swaggerOptions from '@/config/swagger';

export default function ApiDocs() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">API Documentation</h1>
      <SwaggerUI spec={swaggerOptions.definition} />
    </div>
  );
}
