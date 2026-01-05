# ARSITEKTUR SISTEM - Earthquake Indonesia Open API

---

## 1. General Architecture Sistem

Bagian ini menjelaskan struktur General Architecture dari sistem **Earthquake Indonesia Open API**. Arsitektur sistem dirancang menggunakan pola **client-server** dan dibagi menjadi tiga komponen utama, yaitu **Frontend**, **Backend**, dan **Database**, yang saling terintegrasi untuk mendukung seluruh proses penyediaan data gempa Indonesia secara real-time dan historis melalui RESTful API.

### 1.1 FRONTEND (React Web App)

Frontend berfungsi sebagai **antarmuka pengguna** (presentation layer) yang digunakan oleh **User** (Developer/Peneliti) dan **Admin** untuk berinteraksi dengan sistem. Frontend dikembangkan menggunakan **React.js** dengan **Vite** sebagai build tool dan berjalan pada browser web.

**Fitur utama yang ditangani oleh frontend meliputi:**
- Registrasi dan generate API key
- Menampilkan landing page dengan informasi API
- Menampilkan pricing tiers (Free, Pro, Enterprise)
- Dashboard untuk monitoring penggunaan API
- Menampilkan usage analytics dengan charts (Recharts)
- Menampilkan peta gempa interaktif (Leaflet.js)
- Dokumentasi API interaktif
- Manajemen API key (show/hide, copy, regenerate)
- Menampilkan statistik penggunaan API

Frontend berkomunikasi dengan backend melalui **HTTP Request / REST API** untuk mengirimkan permintaan data dan menerima respons yang akan ditampilkan kepada pengguna.

**Teknologi yang digunakan:**
- React.js v18
- Vite v5
- TailwindCSS v3 (Earthy theme)
- React Router v6
- Recharts v2 (untuk charts)
- Leaflet.js v1.9 (untuk maps)
- Axios v1 (HTTP client)
- Heroicons v2 (icons)

---

### 1.2 BACKEND (Node.js + Express)

Backend merupakan **lapisan aplikasi** (application layer) yang bertanggung jawab menangani logika bisnis dan proses utama sistem. Backend dikembangkan menggunakan **Node.js** dengan framework **Express.js**.

**Fungsi utama backend meliputi:**
- **Auth Controller**, untuk menangani proses registrasi user dan generate API key
- **API Controller**, untuk menyediakan data gempa dengan filtering dan pagination
- **Dashboard Controller**, untuk menyediakan statistik penggunaan API
- **Middleware Authentication**, untuk validasi API key pada setiap request
- **Middleware Rate Limiting**, untuk membatasi jumlah request per jam/bulan
- **API Usage Tracking**, untuk mencatat setiap API call ke database
- **Swagger Documentation**, untuk dokumentasi API interaktif

Backend menerima request dari frontend, melakukan **validasi dan pemrosesan data**, kemudian mengirimkan perintah ke database dalam bentuk **SQL Query**. Hasil pemrosesan tersebut selanjutnya dikirim kembali ke frontend sebagai **API Response** dalam format JSON.

**Teknologi yang digunakan:**
- Node.js v16+
- Express.js v4
- Sequelize v6 (ORM)
- MySQL2 (MySQL driver)
- Swagger UI Express (API docs)
- Express Rate Limit (rate limiting)
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- Helmet (security)
- Morgan (logging)
- CORS (Cross-Origin Resource Sharing)

---

### 1.3 DATABASE (MySQL)

Database berfungsi sebagai **lapisan penyimpanan data** (data layer) yang menyimpan seluruh data sistem secara permanen. Sistem menggunakan **MySQL v8** sebagai sistem manajemen basis data relasional.

**Data yang disimpan di dalam database meliputi:**
- **Data API Users** (email, name, company, API key, quota, tier)
- **Data Earthquakes** (928 records dari Kaggle - BMKG/USGS 2008-2025)
  - Tanggal, waktu, koordinat (latitude/longitude)
  - Magnitudo, kedalaman, tipe magnitudo
  - Wilayah, provinsi, kota
  - Remark, sumber data (BMKG/USGS)
- **Data API Usage** (tracking semua API calls)
  - Endpoint, method, status code
  - Response time, IP address, user agent
  - Timestamp

Database **hanya dapat diakses oleh backend server** dan tidak dapat diakses langsung oleh frontend maupun pengguna. Pembatasan ini diterapkan untuk menjaga **keamanan, konsistensi, dan integritas data** sistem.

**Struktur Database:**
- 3 tabel utama: `api_users`, `earthquakes`, `api_usage`
- Relasi: `api_users` (1) → (many) `api_usage`
- Indexes untuk optimasi query: tgl, magnitudo, provinsi, wilayah
- Foreign key constraints untuk data integrity

---

## 2. 3-Tier Architecture

Sistem Earthquake Indonesia API mengimplementasikan arsitektur **3-Tier** yang memisahkan tanggung jawab sistem menjadi tiga lapisan independen:

### 2.1 Presentation Layer (React Web App)

Lapisan ini adalah **antarmuka pengguna** untuk User/Developer dan Admin.

**Fungsi utama:**
- Menampilkan halaman: Landing page, API documentation, Dashboard, Pricing
- Menampilkan form registrasi dan generate API key
- Menampilkan dashboard dengan:
  - Statistik penggunaan (calls today, remaining, total)
  - Charts penggunaan 30 hari terakhir
  - Peta gempa interaktif dengan markers
- Menampilkan tabel API key management
- Mengirim data aksi pengguna ke backend melalui **HTTP Request/REST API**
- Menerima **API Response** (JSON) lalu update tampilan (UI)

**Intinya:** React hanya mengurus tampilan & interaksi, tidak mengakses database langsung.

**Komponen utama:**
- `Navbar.jsx` - Navigasi utama
- `LandingHero.jsx` - Hero section
- `PricingTiers.jsx` - Pricing plans
- `FeaturesSection.jsx` - Fitur API
- `ApiKeyGenerator.jsx` - Form registrasi
- `Dashboard.jsx` - Dashboard user
- `ApiKeysTable.jsx` - Manajemen API key
- `UsageCharts.jsx` - Charts analytics
- `EarthquakeMap.jsx` - Peta gempa
- `ApiDocs.jsx` - Dokumentasi API

---

### 2.2 Application Layer (Node.js + Express)

Lapisan ini adalah **otak sistem** (logika bisnis) dan pintu masuk semua data.

**Fungsi utama:**
- Menangani **Auth** (register, verify API key)
- Menangani **Authorization** (API key validation, role-based access)
- Menjalankan **business logic** Earthquake API:
  - Generate API key dengan format `sk_eq_id_xxxxx`
  - Validasi API key pada setiap request (401 jika invalid)
  - Rate limiting per tier (Free: 100/hour, Pro: 1000/hour)
  - Tracking API usage ke database
  - Filtering data gempa (magnitude, date, province, wilayah)
  - Pagination dan sorting
  - Statistik per provinsi
- Menyediakan **endpoint REST API** untuk frontend
- Mengirim **SQL Query** ke MySQL dan mengolah hasilnya sebelum dikirim balik ke React

**Intinya:** Semua aturan dan proses sistem ada di backend, bukan di frontend.

**Middleware:**
- `auth.js` - Validasi API key
- `rateLimit.js` - Rate limiting & usage tracking
- `errorHandler.js` - Error handling global

**Controllers:**
- `authController` - Register, verify API key
- `earthquakeController` - CRUD data gempa
- `dashboardController` - Usage statistics
- `statsController` - Province statistics

**Utilities:**
- `apiKeyGenerator.js` - Generate secure API key
- `csv-import.js` - Import Kaggle dataset

---

### 2.3 Data Layer (MySQL)

Lapisan ini **menyimpan data** secara permanen.

**Fungsi utama:**
- Menyimpan data inti seperti: `api_users`, `earthquakes`, `api_usage`
- Menyediakan data berdasarkan query dari backend
- **Tidak diakses langsung** oleh React (demi keamanan dan konsistensi data)

**Intinya:** MySQL hanya melayani backend, bukan client.

**Tabel Database:**

1. **api_users**
   - id, email, name, company, use_case
   - api_key (unique, indexed)
   - calls_today, total_calls, quota
   - tier (free/pro/enterprise)
   - last_used, is_active
   - created_at, updated_at

2. **earthquakes** (928 records)
   - id, tgl, ot (origin time)
   - latitude, longitude, kedalaman_km
   - magnitudo, type_magnitudo
   - wilayah, provinsi, kota
   - remark, dirasakan, sumber
   - created_at, updated_at

3. **api_usage**
   - id, api_user_id (FK)
   - endpoint, method, status_code
   - response_time_ms
   - ip_address, user_agent
   - created_at

---

## 3. Alur Kerja Sistem (End-to-End)

### 3.1 Alur Registrasi API Key

1. **User** mengisi form registrasi di React (email, name, company, use_case)
2. **React** mengirim `POST /api/auth/register` ke Node.js/Express
3. **Backend** memvalidasi data, generate API key (`sk_eq_id_xxxxx`)
4. **Backend** menyimpan user ke MySQL (`INSERT INTO api_users`)
5. **MySQL** mengembalikan Result ke backend
6. **Backend** mengirim API Response (API key, quota, tier) ke React
7. **React** menampilkan API key dan menyimpan ke localStorage

### 3.2 Alur Request Data Gempa

1. **User** membuka dashboard atau melakukan API call
2. **React** mengirim `GET /api/earthquakes?mag_min=5.0` dengan header `api-key`
3. **Backend** validasi API key di middleware:
   - Jika invalid → return 401 Unauthorized
   - Jika valid → lanjut ke controller
4. **Backend** cek rate limit:
   - Jika quota habis → return 429 Too Many Requests
   - Jika masih ada → lanjut proses
5. **Backend** mengirim SQL Query ke MySQL:
   ```sql
   SELECT * FROM earthquakes 
   WHERE magnitudo >= 5.0 
   ORDER BY tgl DESC 
   LIMIT 10
   ```
6. **MySQL** mengembalikan data gempa
7. **Backend** mencatat API usage ke `api_usage` table
8. **Backend** update `calls_today` dan `total_calls` di `api_users`
9. **Backend** mengirim API Response (JSON) ke React
10. **React** menampilkan data gempa di UI (table/map/chart)

### 3.3 Alur Dashboard Analytics

1. **User** membuka halaman Dashboard
2. **React** mengirim `GET /api/dashboard/usage` dengan header `api-key`
3. **Backend** validasi API key
4. **Backend** query data:
   - User info dari `api_users`
   - Usage statistics dari `api_usage` (group by date)
   - Recent earthquakes dari `earthquakes`
5. **MySQL** return aggregated data
6. **Backend** format response dan kirim ke React
7. **React** render:
   - Stats cards (calls today, remaining, total)
   - Line chart (Recharts) untuk usage 30 hari
   - Map (Leaflet) dengan earthquake markers

---

## 4. Daftar Endpoint API

### A. Authentication (Auth)

| No | Method | Endpoint | Deskripsi | Auth Required |
|----|--------|----------|-----------|---------------|
| 1 | POST | `/api/auth/register` | Registrasi user dan generate API key | Public |
| 2 | GET | `/api/auth/verify` | Verifikasi validitas API key | API Key |

**Detail Endpoint:**

**1. POST /api/auth/register**
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "company": "Tech Corp",
    "use_case": "Building earthquake monitoring app"
  }
  ```
- **Response (201 Created):**
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

**2. GET /api/auth/verify**
- **Headers:** `api-key: sk_eq_id_xxxxx`
- **Response (200 OK):**
  ```json
  {
    "valid": true,
    "user": {
      "email": "user@example.com",
      "tier": "free",
      "quota": 1000
    }
  }
  ```

---

### B. Earthquake Data (API)

| No | Method | Endpoint | Deskripsi | Auth Required |
|----|--------|----------|-----------|---------------|
| 3 | GET | `/api/earthquakes` | Get earthquakes dengan filtering & pagination | API Key |
| 4 | GET | `/api/earthquakes/realtime` | Get latest earthquakes (real-time) | API Key |
| 5 | GET | `/api/earthquakes/:id` | Get detail earthquake by ID | API Key |
| 6 | GET | `/api/earthquakes/stats/provinces` | Get statistics per province | API Key |

**Detail Endpoint:**

**3. GET /api/earthquakes**
- **Headers:** `api-key: sk_eq_id_xxxxx`
- **Query Parameters:**
  - `limit` (number) - Results per page (default: 10, max: 100)
  - `offset` (number) - Pagination offset (default: 0)
  - `mag_min` (number) - Minimum magnitude
  - `mag_max` (number) - Maximum magnitude
  - `date_from` (date) - Start date (YYYY-MM-DD)
  - `date_to` (date) - End date (YYYY-MM-DD)
  - `province` (string) - Filter by province
  - `wilayah` (string) - Filter by region
  - `sort_by` (string) - Sort field (default: tgl)
  - `order` (string) - Sort order (ASC/DESC, default: DESC)
- **Response (200 OK):**
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
      "total": 928,
      "limit": 10,
      "offset": 0,
      "returned": 10
    }
  }
  ```

**4. GET /api/earthquakes/realtime**
- **Headers:** `api-key: sk_eq_id_xxxxx`
- **Query Parameters:**
  - `limit` (number) - Number of results (default: 50, max: 100)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [...],
    "count": 50,
    "timestamp": "2026-01-05T10:30:00.000Z"
  }
  ```

**5. GET /api/earthquakes/:id**
- **Headers:** `api-key: sk_eq_id_xxxxx`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "tgl": "2026-01-04",
      ...
    }
  }
  ```

**6. GET /api/earthquakes/stats/provinces**
- **Headers:** `api-key: sk_eq_id_xxxxx`
- **Response (200 OK):**
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

### C. Dashboard & Analytics

| No | Method | Endpoint | Deskripsi | Auth Required |
|----|--------|----------|-----------|---------------|
| 7 | GET | `/api/dashboard/usage` | Get usage statistics for user | API Key |
| 8 | GET | `/api/dashboard/recent-earthquakes` | Get recent strong earthquakes for map | API Key |
| 9 | POST | `/api/dashboard/regenerate-key` | Regenerate API key | API Key |

**Detail Endpoint:**

**7. GET /api/dashboard/usage**
- **Headers:** `api-key: sk_eq_id_xxxxx`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "tier": "free",
      "api_key": "sk_eq_id_xxxxx",
      "last_used": "2026-01-05T10:30:00.000Z"
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

**8. GET /api/dashboard/recent-earthquakes**
- **Headers:** `api-key: sk_eq_id_xxxxx`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "latitude": -6.2088,
        "longitude": 106.8456,
        "magnitudo": 5.2,
        "wilayah": "Jakarta Selatan",
        "tgl": "2026-01-04",
        "kedalaman_km": 10
      }
    ],
    "count": 15
  }
  ```

**9. POST /api/dashboard/regenerate-key**
- **Headers:** `api-key: sk_eq_id_xxxxx` (old key)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "API key regenerated successfully",
    "api_key": "sk_eq_id_newrandomstring",
    "old_key_invalidated": true
  }
  ```

---

### D. System Health

| No | Method | Endpoint | Deskripsi | Auth Required |
|----|--------|----------|-----------|---------------|
| 10 | GET | `/health` | Check API health status | Public |
| 11 | GET | `/api-docs` | Swagger API documentation | Public |

**Detail Endpoint:**

**10. GET /health**
- **Response (200 OK):**
  ```json
  {
    "status": "OK",
    "timestamp": "2026-01-05T10:30:00.000Z",
    "uptime": 123456,
    "database": "connected"
  }
  ```

**11. GET /api-docs**
- **Response:** Swagger UI HTML page
- **Features:** Interactive API documentation dengan try-it-out functionality

---

## 5. Error Responses

Semua endpoint menggunakan HTTP status code standar dan format error yang konsisten:

### 5.1 Authentication Errors

**401 Unauthorized** - API key tidak valid atau tidak ada
```json
{
  "error": "Unauthorized",
  "message": "API key is required. Please provide an API key in the 'api-key' header."
}
```

**403 Forbidden** - API key tidak aktif
```json
{
  "error": "Forbidden",
  "message": "API key is inactive. Please contact support."
}
```

### 5.2 Rate Limiting Errors

**429 Too Many Requests** - Quota terlampaui
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

### 5.3 Validation Errors

**400 Bad Request** - Request tidak valid
```json
{
  "error": "Bad Request",
  "message": "Invalid query parameter: mag_min must be a number",
  "field": "mag_min"
}
```

### 5.4 Not Found Errors

**404 Not Found** - Resource tidak ditemukan
```json
{
  "error": "Not Found",
  "message": "Earthquake with ID 999 not found"
}
```

### 5.5 Server Errors

**500 Internal Server Error** - Server error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred. Please try again later."
}
```

---

## 6. Security & Best Practices

### 6.1 API Key Security
- API key disimpan dalam format hash di database
- API key dikirim via HTTP header, bukan query parameter
- API key memiliki prefix `sk_eq_id_` untuk identifikasi
- API key dapat di-regenerate jika terkompromis

### 6.2 Rate Limiting
- Tier-based rate limiting (Free: 100/hour, Pro: 1000/hour, Enterprise: unlimited)
- Counter reset setiap jam
- Response header menyertakan rate limit info

### 6.3 Data Validation
- Input validation di backend menggunakan express-validator
- SQL injection prevention dengan Sequelize ORM
- XSS prevention dengan helmet middleware

### 6.4 CORS Configuration
- CORS enabled untuk frontend domain
- Preflight request handling
- Credential support untuk cookies/sessions

### 6.5 Logging & Monitoring
- Morgan middleware untuk HTTP request logging
- API usage tracking ke database
- Error logging untuk debugging

---

## 7. Deployment Architecture

### 7.1 Development Environment
- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:5173
- **Database:** localhost:3306

### 7.2 Production Environment (Recommended)
- **Backend:** VPS/Cloud (AWS EC2, DigitalOcean, etc.) dengan PM2
- **Frontend:** Static hosting (Vercel, Netlify, etc.)
- **Database:** Managed MySQL (AWS RDS, DigitalOcean Managed DB)
- **SSL/TLS:** Let's Encrypt dengan Nginx reverse proxy
- **CDN:** CloudFlare untuk static assets

---

## 8. Technology Stack Summary

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React | v18 | UI framework |
| | Vite | v5 | Build tool |
| | TailwindCSS | v3 | CSS framework |
| | React Router | v6 | Routing |
| | Recharts | v2 | Charts |
| | Leaflet | v1.9 | Maps |
| | Axios | v1 | HTTP client |
| **Backend** | Node.js | v16+ | Runtime |
| | Express | v4 | Web framework |
| | Sequelize | v6 | ORM |
| | MySQL2 | latest | MySQL driver |
| | Swagger UI | latest | API docs |
| | JWT | latest | Authentication |
| **Database** | MySQL | v8 | Database |
| **DevOps** | PM2 | latest | Process manager |
| | Nginx | latest | Reverse proxy |
| | Git | latest | Version control |

---

**Dokumentasi ini menjelaskan arsitektur lengkap sistem Earthquake Indonesia Open API yang siap untuk production deployment.**
