require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Earthquake Indonesia API',
      version: '1.0.0',
      description: 'Real-time & Historical BMKG Earthquake Data API with 99.9% Uptime',
      contact: {
        name: 'API Support',
        email: 'support@earthquakeapi.id'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'api-key',
          description: 'API Key for authentication (format: sk_eq_id_xxxxx)'
        }
      }
    },
    security: [
      {
        ApiKeyAuth: []
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve static files for custom Swagger assets
app.use('/public', express.static('public'));

// Custom Swagger UI HTML
const customSwaggerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Earthquake Indonesia API Documentation</title>
  <link rel="icon" type="image/svg+xml" href="/public/swagger-logo.svg">
  <link rel="stylesheet" type="text/css" href="./swagger-ui.css">
  <link rel="stylesheet" type="text/css" href="/public/swagger-custom.css">
  <style>
    body { margin: 0; padding: 0; }
  </style>
</head>
<body>
  <!-- Custom Header -->
  <div class="custom-swagger-header">
    <div class="container">
      <h1>
        🌍 Earthquake Indonesia API
        <span class="version-badge">1.0.0</span>
        <span class="oas-badge">OAS 3.0</span>
      </h1>
      <p>Real-time & Historical BMKG Earthquake Data API with 99.9% Uptime</p>
      <a href="mailto:support@earthquakeapi.id" class="contact-link">📧 Contact API Support</a>
    </div>
  </div>

  <!-- Swagger UI Container -->
  <div id="swagger-ui"></div>

  <script src="./swagger-ui-bundle.js"></script>
  <script src="./swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      const ui = SwaggerUIBundle({
        url: './swagger.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout",
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        syntaxHighlight: {
          activate: true,
          theme: 'monokai'
        },
        tryItOutEnabled: true,
        docExpansion: 'list',
        defaultModelsExpandDepth: 3,
        defaultModelExpandDepth: 3,
        displayOperationId: false,
        showExtensions: true,
        showCommonExtensions: true
      });
      window.ui = ui;
    };
  </script>
</body>
</html>
`;

// Custom Swagger UI options
const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customCssUrl: '/public/swagger-custom.css',
  customSiteTitle: 'Earthquake Indonesia API Documentation',
  customfavIcon: '/public/swagger-logo.svg',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    syntaxHighlight: {
      activate: true,
      theme: 'monokai'
    },
    tryItOutEnabled: true,
    docExpansion: 'list',
    defaultModelsExpandDepth: 3,
    defaultModelExpandDepth: 3
  }
};

// Swagger JSON endpoint
app.get('/api-docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/earthquakes', require('./routes/api'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Earthquake Indonesia API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Earthquake Indonesia API',
    version: '1.0.0',
    documentation: `http://localhost:${PORT}/api-docs`,
    endpoints: {
      register: 'POST /api/auth/register',
      earthquakes: 'GET /api/earthquakes',
      dashboard: 'GET /api/dashboard/usage'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
    path: req.path
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Earthquake Indonesia API Server running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
});

module.exports = app;
