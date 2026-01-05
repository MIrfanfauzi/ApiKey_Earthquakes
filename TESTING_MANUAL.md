# 🧪 PANDUAN TESTING MANUAL - Earthquake Indonesia API

Panduan lengkap untuk menguji semua fitur aplikasi sebelum demo/presentasi.

---

## 📋 PERSIAPAN

### 1. Pastikan Server Berjalan

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Harus muncul: `🚀 Earthquake Indonesia API Server running on port 5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Harus muncul: `Local: http://localhost:5173/`

---

## 🧪 TEST 1: Landing Page

### Langkah:
1. Buka browser: **http://localhost:5173**

### Yang Harus Terlihat:
- ✅ Navbar dengan logo "API Gempa Indonesia"
- ✅ Menu: Beranda, Dokumentasi API, Dasboard, Dapatkan API Key
- ✅ Hero section dengan judul "API Gempa Indonesia"
- ✅ Subtitle "Data BMKG Real-time & Historis"
- ✅ 2 tombol: "Dapatkan API Key Gratis" dan "Dokumentasi API"
- ✅ 4 kartu statistik: 10+ Endpoint, 99.9% Uptime, 1K+ Panggilan, 24/7 Akses
- ✅ Section Features dengan 6 fitur
- ✅ Section Pricing dengan 3 tier (Free, Pro, Enterprise)
- ✅ Form "Get Your Free API Key"
- ✅ Footer

### Screenshot:
📸 Ambil screenshot full page untuk dokumentasi

**Status:** ✅ PASS / ❌ FAIL

---

## 🧪 TEST 2: Responsive Design

### Langkah:
1. Tekan **F12** (Developer Tools)
2. Klik icon **Toggle Device Toolbar** (Ctrl+Shift+M)
3. Test di berbagai ukuran:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1920px

### Yang Harus Terlihat:
- ✅ Mobile: Hamburger menu muncul
- ✅ Tablet: Layout menyesuaikan
- ✅ Desktop: Full layout
- ✅ Semua teks terbaca
- ✅ Tidak ada overflow horizontal

**Status:** ✅ PASS / ❌ FAIL

---

## 🧪 TEST 3: API Key Registration

### Langkah:
1. Scroll ke bagian "Get Your Free API Key"
2. Isi form:
   - **Email:** `test@example.com`
   - **Full Name:** `Test User`
   - **Company:** `Test Corp` (optional)
   - **Use Case:** `Testing API` (optional)
3. Klik **"Generate API Key"**

### Yang Harus Terjadi:
- ✅ Loading indicator muncul
- ✅ Setelah 1-2 detik, muncul kotak hijau
- ✅ Pesan: "API Key Generated Successfully!"
- ✅ API key ditampilkan (format: `sk_eq_id_xxxxx`)
- ✅ Tombol "Copy" berfungsi
- ✅ Tombol "Go to Dashboard →" muncul
- ✅ Info Tier: free, Quota: 1000

### Test Error:
1. Coba register dengan email yang sama lagi
2. ✅ Harus muncul error: "Email sudah terdaftar"

### Simpan API Key:
📝 **Copy dan simpan API key Anda untuk test selanjutnya!**

**API Key Anda:** `_________________________`

**Status:** ✅ PASS / ❌ FAIL

---

## 🧪 TEST 4: Dashboard

### Langkah:
1. Klik tombol **"Go to Dashboard →"**
2. Atau klik menu **"Dasboard"** di navbar

### Yang Harus Terlihat:
- ✅ Judul "Dashboard"
- ✅ Welcome message: "Selamat datang kembali, Test User"
- ✅ 4 kartu stats:
  - Tier: free
  - Panggilan Hari Ini: 0
  - Tersisa: 1000
  - Total Panggilan: 0
- ✅ Section "API Key Management"
  - Tabel dengan API key (sebagian disembunyikan)
  - Tombol "Show/Hide"
  - Tombol "Copy"
  - Tombol "Regenerate Key"
- ✅ Section "Usage Analytics"
  - Chart (mungkin kosong karena belum ada panggilan)
- ✅ Section "Recent Strong Earthquakes"
  - Peta Indonesia dengan pin merah
  - Gempa dengan magnitude ≥ 4.0

### Test Fitur:
1. **Show/Hide API Key:**
   - Klik "Show" → API key terlihat penuh
   - Klik "Hide" → API key tersembunyi
   - ✅ PASS / ❌ FAIL

2. **Copy API Key:**
   - Klik "Copy"
   - Paste di notepad
   - ✅ API key tersalin dengan benar
   - ✅ PASS / ❌ FAIL

3. **Peta Gempa:**
   - ✅ Peta Indonesia terlihat
   - ✅ Ada pin merah (marker gempa)
   - Klik pin → popup muncul dengan info gempa
   - ✅ PASS / ❌ FAIL

### Screenshot:
📸 Ambil screenshot dashboard untuk dokumentasi

**Status:** ✅ PASS / ❌ FAIL

---

## 🧪 TEST 5: API Documentation Page

### Langkah:
1. Klik menu **"Dokumentasi API"**

### Yang Harus Terlihat:
- ✅ Judul "API Documentation"
- ✅ Tombol "Interactive Swagger Docs"
- ✅ Tombol "API Health Check"
- ✅ Section "Quick Start" dengan 3 langkah
- ✅ Section "Authentication"
- ✅ Section "Endpoints" dengan semua endpoint
- ✅ Section "Rate Limiting"
- ✅ Section "Response Format"
- ✅ Contoh curl commands

### Test Link:
1. Klik **"Interactive Swagger Docs"**
2. ✅ Membuka tab baru: http://localhost:5000/api-docs
3. ✅ Swagger UI terlihat dengan daftar endpoint

**Status:** ✅ PASS / ❌ FAIL

---

## 🧪 TEST 6: Swagger API Documentation

### Langkah:
1. Buka: **http://localhost:5000/api-docs**

### Yang Harus Terlihat:
- ✅ Swagger UI interface
- ✅ Judul "Earthquake Indonesia API"
- ✅ Daftar endpoint:
  - POST /api/auth/register
  - GET /api/auth/verify
  - GET /api/earthquakes
  - GET /api/earthquakes/realtime
  - GET /api/earthquakes/{id}
  - GET /api/earthquakes/stats/provinces
  - GET /api/dashboard/usage
  - GET /api/dashboard/recent-earthquakes
  - POST /api/dashboard/regenerate-key

### Test Endpoint (Tanpa API Key):
1. Expand **GET /api/earthquakes**
2. Klik **"Try it out"**
3. Klik **"Execute"**
4. ✅ Response Code: **401 Unauthorized**
5. ✅ Response Body: `"API key is required"`

**Status:** ✅ PASS / ❌ FAIL

---

## 🧪 TEST 7: API dengan API Key (Swagger)

### Langkah:
1. Di Swagger UI, klik tombol **"Authorize"** (🔒 di kanan atas)
2. Masukkan API key Anda di field **"api-key"**
3. Format: `sk_eq_id_xxxxx` (tanpa quotes)
4. Klik **"Authorize"**
5. Klik **"Close"**

### Test GET /api/earthquakes:
1. Expand **GET /api/earthquakes**
2. Klik **"Try it out"**
3. Set parameter:
   - `limit`: 10
   - `mag_min`: 5.0
4. Klik **"Execute"**

### Yang Harus Terjadi:
- ✅ Response Code: **200 OK**
- ✅ Response Body berisi array gempa
- ✅ Ada field: id, tgl, latitude, longitude, magnitudo, wilayah
- ✅ Semua gempa memiliki magnitude ≥ 5.0
- ✅ Maksimal 10 gempa

### Test GET /api/earthquakes/realtime:
1. Expand **GET /api/earthquakes/realtime**
2. Klik **"Try it out"**
3. Set `limit`: 20
4. Klik **"Execute"**
5. ✅ Response Code: **200 OK**
6. ✅ Data gempa terbaru (sorted by date DESC)

### Test GET /api/earthquakes/stats/provinces:
1. Expand **GET /api/earthquakes/stats/provinces**
2. Klik **"Try it out"**
3. Klik **"Execute"**
4. ✅ Response Code: **200 OK**
5. ✅ Data statistik per provinsi
6. ✅ Ada field: provinsi, total_earthquakes, avg_magnitude, max_magnitude

### Screenshot:
📸 Ambil screenshot Swagger dengan response sukses

**Status:** ✅ PASS / ❌ FAIL

---

## 🧪 TEST 8: API dengan cURL (Command Line)

### Langkah:
Buka PowerShell/Terminal dan jalankan commands berikut:

### Test 1: Tanpa API Key (Harus Error)
```bash
curl http://localhost:5000/api/earthquakes
```
✅ **Expected:** 401 Unauthorized

### Test 2: Dengan API Key (Harus Sukses)
```bash
curl -H "api-key: YOUR_API_KEY_HERE" http://localhost:5000/api/earthquakes?limit=5
```
✅ **Expected:** 200 OK dengan data 5 gempa

### Test 3: Filter by Magnitude
```bash
curl -H "api-key: YOUR_API_KEY_HERE" "http://localhost:5000/api/earthquakes?mag_min=6.0&limit=10"
```
✅ **Expected:** Data gempa dengan magnitude ≥ 6.0

### Test 4: Filter by Province
```bash
curl -H "api-key: YOUR_API_KEY_HERE" "http://localhost:5000/api/earthquakes?province=Jawa&limit=10"
```
✅ **Expected:** Data gempa di provinsi Jawa

### Test 5: Get Specific Earthquake
```bash
curl -H "api-key: YOUR_API_KEY_HERE" http://localhost:5000/api/earthquakes/1
```
✅ **Expected:** Detail gempa dengan ID 1

**Status:** ✅ PASS / ❌ FAIL

---

## 🧪 TEST 9: Rate Limiting

### Langkah:
1. Buat script untuk hit API 100+ kali
2. Atau gunakan Swagger dan execute berkali-kali

### PowerShell Script:
```powershell
for ($i=1; $i -le 105; $i++) {
    Write-Host "Request $i"
    curl -H "api-key: YOUR_API_KEY_HERE" http://localhost:5000/api/earthquakes?limit=1
}
```

### Yang Harus Terjadi:
- ✅ Request 1-100: **200 OK**
- ✅ Request 101+: **429 Too Many Requests**
- ✅ Response body: "Rate limit exceeded"

**Status:** ✅ PASS / ❌ FAIL

---

## 🧪 TEST 10: Dashboard Usage Update

### Langkah:
1. Setelah melakukan beberapa API calls
2. Refresh halaman **Dashboard**

### Yang Harus Berubah:
- ✅ "Panggilan Hari Ini" bertambah
- ✅ "Tersisa" berkurang
- ✅ "Total Panggilan" bertambah
- ✅ Chart "Usage Analytics" menampilkan data

**Status:** ✅ PASS / ❌ FAIL

---

## 🧪 TEST 11: Database Verification

### Langkah:
Buka MySQL dan cek data:

```sql
-- Cek jumlah gempa
SELECT COUNT(*) as total FROM earthquakes;
-- Expected: 928

-- Cek gempa terkuat
SELECT * FROM earthquakes ORDER BY magnitudo DESC LIMIT 5;

-- Cek API users
SELECT email, name, tier, quota, calls_today, total_calls FROM api_users;

-- Cek API usage
SELECT COUNT(*) as total_api_calls FROM api_usage;
```

### Yang Harus Terlihat:
- ✅ 928 gempa di database
- ✅ User test@example.com ada
- ✅ API usage tercatat

**Status:** ✅ PASS / ❌ FAIL

---

## 🧪 TEST 12: Error Handling

### Test 1: Invalid API Key
```bash
curl -H "api-key: invalid_key_123" http://localhost:5000/api/earthquakes
```
✅ **Expected:** 401 Unauthorized

### Test 2: Malformed Request
```bash
curl -H "api-key: YOUR_KEY" "http://localhost:5000/api/earthquakes?mag_min=abc"
```
✅ **Expected:** 400 Bad Request atau data kosong

### Test 3: Non-existent Endpoint
```bash
curl -H "api-key: YOUR_KEY" http://localhost:5000/api/nonexistent
```
✅ **Expected:** 404 Not Found

### Test 4: Non-existent Earthquake ID
```bash
curl -H "api-key: YOUR_KEY" http://localhost:5000/api/earthquakes/99999
```
✅ **Expected:** 404 Not Found

**Status:** ✅ PASS / ❌ FAIL

---

## 📊 HASIL TESTING

### Summary Checklist:

| No | Test Case | Status | Catatan |
|----|-----------|--------|---------|
| 1 | Landing Page | ⬜ | |
| 2 | Responsive Design | ⬜ | |
| 3 | API Key Registration | ⬜ | |
| 4 | Dashboard | ⬜ | |
| 5 | API Docs Page | ⬜ | |
| 6 | Swagger UI | ⬜ | |
| 7 | API dengan Key (Swagger) | ⬜ | |
| 8 | API dengan cURL | ⬜ | |
| 9 | Rate Limiting | ⬜ | |
| 10 | Dashboard Update | ⬜ | |
| 11 | Database Verification | ⬜ | |
| 12 | Error Handling | ⬜ | |

**Total PASS:** _____ / 12

---

## 🎯 KRITERIA SUKSES

Proyek dianggap **LULUS** jika:
- ✅ Minimal 10/12 test PASS
- ✅ Test 3, 4, 7, 8 WAJIB PASS (fitur utama)
- ✅ Tidak ada error fatal
- ✅ UI responsive
- ✅ Data real dari Kaggle terlihat

---

## 📸 DOKUMENTASI

### Screenshot yang Perlu Diambil:
1. ✅ Landing page (full page)
2. ✅ Dashboard dengan stats & map
3. ✅ Swagger UI dengan response sukses
4. ✅ API Key registration success
5. ✅ Peta gempa dengan markers
6. ✅ Usage charts (setelah ada data)

### Video Demo (Optional):
- 2-3 menit walkthrough
- Tunjukkan: Register → Dashboard → API Test → Map

---

## 🚀 SETELAH TESTING

Jika semua test PASS:
1. ✅ Proyek siap demo
2. ✅ Proyek siap dikumpulkan
3. ✅ Siap presentasi

Jika ada yang FAIL:
1. Catat error message
2. Screenshot error
3. Tanyakan untuk troubleshooting

---

**GOOD LUCK! 🎉**
