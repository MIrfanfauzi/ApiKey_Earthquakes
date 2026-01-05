# API Usage Guide

Complete guide for using the Earthquake Indonesia API.

## Authentication

All API requests (except registration) require an API key in the header:

```bash
-H "api-key: YOUR_API_KEY_HERE"
```

## Endpoints

### 1. Register for API Key

**POST** `/api/auth/register`

Register a new user and receive an API key.

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe",
    "company": "Tech Corp",
    "use_case": "Building earthquake monitoring dashboard"
  }'
```

**Response:**
```json
{
  "message": "API key generated successfully",
  "api_key": "sk_eq_id_48charsrandomstring",
  "quota": 1000,
  "tier": "free",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

---

### 2. Get Earthquakes (with filters)

**GET** `/api/earthquakes`

Retrieve earthquake data with optional filters.

**Query Parameters:**
- `limit` (number) - Results per page (max 100, default 10)
- `offset` (number) - Pagination offset (default 0)
- `mag_min` (number) - Minimum magnitude
- `mag_max` (number) - Maximum magnitude
- `date_from` (date) - Start date (YYYY-MM-DD)
- `date_to` (date) - End date (YYYY-MM-DD)
- `province` (string) - Filter by province
- `wilayah` (string) - Filter by region
- `sort_by` (string) - Sort field (default: tgl)
- `order` (string) - Sort order (ASC/DESC, default: DESC)

**Examples:**

Get latest 10 earthquakes:
```bash
curl -X GET "http://localhost:5000/api/earthquakes" \
  -H "api-key: sk_eq_id_xxxxx"
```

Get earthquakes with magnitude >= 5.0:
```bash
curl -X GET "http://localhost:5000/api/earthquakes?mag_min=5.0" \
  -H "api-key: sk_eq_id_xxxxx"
```

Get earthquakes in Java:
```bash
curl -X GET "http://localhost:5000/api/earthquakes?province=Jawa" \
  -H "api-key: sk_eq_id_xxxxx"
```

Get earthquakes in date range:
```bash
curl -X GET "http://localhost:5000/api/earthquakes?date_from=2025-01-01&date_to=2026-01-05" \
  -H "api-key: sk_eq_id_xxxxx"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "tgl": "2026-01-04",
      "ot": "14:30:00",
      "latitude": -6.2088,
      "longitude": 106.8456,
      "kedalaman_km": 10,
      "magnitudo": 5.2,
      "type_magnitudo": "Mw",
      "wilayah": "Jakarta Selatan",
      "remark": "Gempa terasa hingga radius 50 km",
      "provinsi": "DKI Jakarta",
      "kota": "Jakarta",
      "dirasakan": "III-IV MMI",
      "sumber": "BMKG"
    }
  ],
  "pagination": {
    "total": 100,
    "limit": 10,
    "offset": 0,
    "returned": 10
  }
}
```

---

### 3. Get Realtime Earthquakes

**GET** `/api/earthquakes/realtime`

Get the most recent earthquake events.

**Query Parameters:**
- `limit` (number) - Number of results (max 100, default 50)

**Example:**
```bash
curl -X GET "http://localhost:5000/api/earthquakes/realtime?limit=50" \
  -H "api-key: sk_eq_id_xxxxx"
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 50,
  "timestamp": "2026-01-05T11:30:00.000Z"
}
```

---

### 4. Get Earthquake by ID

**GET** `/api/earthquakes/:id`

Retrieve detailed information about a specific earthquake.

**Example:**
```bash
curl -X GET "http://localhost:5000/api/earthquakes/1" \
  -H "api-key: sk_eq_id_xxxxx"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "tgl": "2026-01-04",
    "latitude": -6.2088,
    "longitude": 106.8456,
    "magnitudo": 5.2,
    "wilayah": "Jakarta Selatan",
    ...
  }
}
```

---

### 5. Get Province Statistics

**GET** `/api/earthquakes/stats/provinces`

Get aggregated earthquake statistics grouped by province.

**Example:**
```bash
curl -X GET "http://localhost:5000/api/earthquakes/stats/provinces" \
  -H "api-key: sk_eq_id_xxxxx"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "provinsi": "DKI Jakarta",
      "total_earthquakes": 150,
      "avg_magnitude": 4.5,
      "max_magnitude": 6.8,
      "min_magnitude": 3.2
    }
  ],
  "count": 34
}
```

---

### 6. Get Usage Statistics

**GET** `/api/dashboard/usage`

Get API usage statistics for your account.

**Example:**
```bash
curl -X GET "http://localhost:5000/api/dashboard/usage" \
  -H "api-key: sk_eq_id_xxxxx"
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "tier": "free",
    "api_key": "sk_eq_id_xxxxx"
  },
  "quota": {
    "limit": 1000,
    "used_today": 45,
    "remaining": 955,
    "total_calls": 1234
  },
  "usage_by_day": [
    { "date": "2026-01-05", "calls": 45 },
    { "date": "2026-01-04", "calls": 78 }
  ],
  "top_endpoints": [
    { "endpoint": "/api/earthquakes", "calls": 500 }
  ]
}
```

---

## Error Handling

### 401 Unauthorized

Missing or invalid API key.

```json
{
  "error": "Unauthorized",
  "message": "API key is required. Please provide an API key in the 'api-key' header."
}
```

### 429 Too Many Requests

Rate limit exceeded.

```json
{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Maximum 100 requests per hour for free tier.",
  "quota": {
    "limit": 100,
    "used": 100,
    "remaining": 0,
    "reset": "2026-01-05T12:00:00.000Z"
  }
}
```

### 404 Not Found

Resource not found.

```json
{
  "error": "Not Found",
  "message": "Earthquake with ID 999 not found"
}
```

---

## Rate Limits

| Tier | Hourly Limit | Monthly Limit |
|------|--------------|---------------|
| Free | 100 | 1,000 |
| Pro | 1,000 | 50,000 |
| Enterprise | Unlimited | Unlimited |

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 2026-01-05T12:00:00Z
```

---

## JavaScript/Node.js Example

```javascript
const axios = require('axios');

const API_KEY = 'sk_eq_id_xxxxx';
const BASE_URL = 'http://localhost:5000';

async function getEarthquakes() {
  try {
    const response = await axios.get(`${BASE_URL}/api/earthquakes`, {
      headers: {
        'api-key': API_KEY
      },
      params: {
        mag_min: 5.0,
        limit: 10
      }
    });
    
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

getEarthquakes();
```

---

## Python Example

```python
import requests

API_KEY = 'sk_eq_id_xxxxx'
BASE_URL = 'http://localhost:5000'

headers = {
    'api-key': API_KEY
}

params = {
    'mag_min': 5.0,
    'limit': 10
}

response = requests.get(f'{BASE_URL}/api/earthquakes', headers=headers, params=params)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f'Error: {response.status_code}')
    print(response.json())
```

---

## Best Practices

1. **Store API Key Securely** - Never commit API keys to version control
2. **Handle Rate Limits** - Implement exponential backoff for 429 errors
3. **Cache Responses** - Cache data when appropriate to reduce API calls
4. **Error Handling** - Always handle errors gracefully
5. **Use Filters** - Use query parameters to get only the data you need

---

For more information, visit the interactive Swagger documentation at `http://localhost:5000/api-docs`
