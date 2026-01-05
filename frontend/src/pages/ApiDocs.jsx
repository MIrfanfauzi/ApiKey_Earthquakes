import { CodeBracketIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

export default function ApiDocs() {
    const endpoints = [
        {
            method: 'POST',
            path: '/api/auth/register',
            description: 'Register and get API key',
            auth: false,
            example: `curl -X POST http://localhost:5000/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "name": "John Doe",
    "company": "Tech Corp",
    "use_case": "Building earthquake monitoring app"
  }'`
        },
        {
            method: 'GET',
            path: '/api/earthquakes',
            description: 'Get earthquakes with filters (latest 10 by default)',
            auth: true,
            params: ['limit', 'offset', 'mag_min', 'mag_max', 'date_from', 'date_to', 'province', 'wilayah'],
            example: `curl -X GET "http://localhost:5000/api/earthquakes?mag_min=5.0&limit=10" \\
  -H "api-key: sk_eq_id_xxxxx"`
        },
        {
            method: 'GET',
            path: '/api/earthquakes/realtime',
            description: 'Get latest earthquakes (up to 100)',
            auth: true,
            params: ['limit'],
            example: `curl -X GET "http://localhost:5000/api/earthquakes/realtime?limit=50" \\
  -H "api-key: sk_eq_id_xxxxx"`
        },
        {
            method: 'GET',
            path: '/api/earthquakes/:id',
            description: 'Get specific earthquake by ID',
            auth: true,
            example: `curl -X GET "http://localhost:5000/api/earthquakes/1" \\
  -H "api-key: sk_eq_id_xxxxx"`
        },
        {
            method: 'GET',
            path: '/api/earthquakes/stats/provinces',
            description: 'Get earthquake statistics by province',
            auth: true,
            example: `curl -X GET "http://localhost:5000/api/earthquakes/stats/provinces" \\
  -H "api-key: sk_eq_id_xxxxx"`
        },
        {
            method: 'GET',
            path: '/api/dashboard/usage',
            description: 'Get API usage statistics',
            auth: true,
            example: `curl -X GET "http://localhost:5000/api/dashboard/usage" \\
  -H "api-key: sk_eq_id_xxxxx"`
        }
    ]

    const getMethodColor = (method) => {
        switch (method) {
            case 'GET':
                return 'bg-blue-100 text-blue-800'
            case 'POST':
                return 'bg-green-100 text-green-800'
            case 'PUT':
                return 'bg-yellow-100 text-yellow-800'
            case 'DELETE':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="min-h-screen bg-earth-beige">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-earth-bark mb-4">
                        API Documentation
                    </h1>
                    <p className="text-lg text-earth-bark/70 max-w-2xl mx-auto mb-6">
                        Complete guide to using the Earthquake Indonesia API
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="http://localhost:5000/api-docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center justify-center"
                        >
                            <DocumentTextIcon className="w-5 h-5 mr-2" />
                            Interactive Swagger Docs
                        </a>
                        <a
                            href="http://localhost:5000/health"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary inline-flex items-center justify-center"
                        >
                            <CodeBracketIcon className="w-5 h-5 mr-2" />
                            API Health Check
                        </a>
                    </div>
                </div>

                {/* Quick Start */}
                <div className="card p-8 mb-8">
                    <h2 className="text-2xl font-bold text-earth-bark mb-4">Quick Start</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-earth-bark mb-2">1. Get Your API Key</h3>
                            <p className="text-earth-bark/70">
                                Register on the <a href="/#get-started" className="text-earth-forest underline">home page</a> to receive your free API key.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-earth-bark mb-2">2. Make Your First Request</h3>
                            <p className="text-earth-bark/70 mb-2">
                                Include your API key in the <code className="bg-earth-beige px-2 py-1 rounded">api-key</code> header:
                            </p>
                            <pre className="bg-earth-bark text-earth-beige p-4 rounded-lg overflow-x-auto">
                                {`curl -X GET "http://localhost:5000/api/earthquakes" \\
  -H "api-key: YOUR_API_KEY_HERE"`}
                            </pre>
                        </div>
                        <div>
                            <h3 className="font-semibold text-earth-bark mb-2">3. Handle Responses</h3>
                            <p className="text-earth-bark/70">
                                All responses are in JSON format. Check the status code and handle errors appropriately.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Authentication */}
                <div className="card p-8 mb-8">
                    <h2 className="text-2xl font-bold text-earth-bark mb-4">Authentication</h2>
                    <p className="text-earth-bark/70 mb-4">
                        All API endpoints (except registration) require authentication via API key.
                    </p>
                    <div className="bg-earth-beige p-4 rounded-lg">
                        <p className="font-semibold text-earth-bark mb-2">Header Format:</p>
                        <code className="text-sm">api-key: sk_eq_id_xxxxxxxxxxxxx</code>
                    </div>
                    <div className="mt-4 space-y-2">
                        <p className="text-sm text-earth-bark/70">
                            <strong>401 Unauthorized:</strong> Missing or invalid API key
                        </p>
                        <p className="text-sm text-earth-bark/70">
                            <strong>429 Too Many Requests:</strong> Rate limit exceeded
                        </p>
                    </div>
                </div>

                {/* Endpoints */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-earth-bark mb-6">Endpoints</h2>

                    {endpoints.map((endpoint, index) => (
                        <div key={index} className="card p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div className="flex items-center space-x-3 mb-2 md:mb-0">
                                    <span className={`px-3 py-1 rounded font-semibold text-sm ${getMethodColor(endpoint.method)}`}>
                                        {endpoint.method}
                                    </span>
                                    <code className="text-lg font-mono text-earth-bark">{endpoint.path}</code>
                                </div>
                                {endpoint.auth && (
                                    <span className="text-sm text-earth-bark/60">🔒 Requires API Key</span>
                                )}
                            </div>

                            <p className="text-earth-bark/70 mb-4">{endpoint.description}</p>

                            {endpoint.params && (
                                <div className="mb-4">
                                    <p className="font-semibold text-earth-bark mb-2">Query Parameters:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {endpoint.params.map((param, i) => (
                                            <code key={i} className="bg-earth-beige px-2 py-1 rounded text-sm">
                                                {param}
                                            </code>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <p className="font-semibold text-earth-bark mb-2">Example Request:</p>
                                <pre className="bg-earth-bark text-earth-beige p-4 rounded-lg overflow-x-auto text-sm">
                                    {endpoint.example}
                                </pre>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Rate Limiting */}
                <div className="card p-8 mt-8">
                    <h2 className="text-2xl font-bold text-earth-bark mb-4">Rate Limiting</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-earth-bark mb-2">Free Tier</h3>
                            <p className="text-earth-bark/70">100 requests per hour, 1,000 per month</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-earth-bark mb-2">Pro Tier</h3>
                            <p className="text-earth-bark/70">1,000 requests per hour, 50,000 per month</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-earth-bark mb-2">Enterprise Tier</h3>
                            <p className="text-earth-bark/70">Unlimited requests</p>
                        </div>
                    </div>
                    <div className="mt-4 bg-earth-beige p-4 rounded-lg">
                        <p className="font-semibold text-earth-bark mb-2">Rate Limit Headers:</p>
                        <code className="text-sm block">X-RateLimit-Limit: 100</code>
                        <code className="text-sm block">X-RateLimit-Remaining: 95</code>
                        <code className="text-sm block">X-RateLimit-Reset: 2026-01-05T12:00:00Z</code>
                    </div>
                </div>

                {/* Response Format */}
                <div className="card p-8 mt-8">
                    <h2 className="text-2xl font-bold text-earth-bark mb-4">Response Format</h2>
                    <p className="text-earth-bark/70 mb-4">All successful responses follow this structure:</p>
                    <pre className="bg-earth-bark text-earth-beige p-4 rounded-lg overflow-x-auto">
                        {`{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 100,
    "limit": 10,
    "offset": 0,
    "returned": 10
  }
}`}
                    </pre>
                </div>
            </div>
        </div>
    )
}
