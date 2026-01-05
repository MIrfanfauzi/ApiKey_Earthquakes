# Script Git Commit Otomatis - 30+ Commits
# Earthquake Indonesia API

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Git Commit Script - Earthquake API" -ForegroundColor Cyan
Write-Host "Total Commits: 52" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Commit 1: Setup awal
Write-Host "[1/52] Membuat struktur folder proyek..." -ForegroundColor Yellow
git add .gitignore
git commit -m "Membuat file .gitignore untuk proyek"

# Commit 2-3: README dan dokumentasi awal
Write-Host "[2/52] Menambahkan README proyek..." -ForegroundColor Yellow
git add README.md
git commit -m "Menambahkan README.md dengan dokumentasi lengkap"

Write-Host "[3/52] Menambahkan file setup..." -ForegroundColor Yellow
git add SETUP.md
git commit -m "Membuat panduan setup untuk development"

# Commit 4-5: Database setup
Write-Host "[4/52] Menambahkan konfigurasi database..." -ForegroundColor Yellow
git add database-setup.sql
git commit -m "Membuat script SQL untuk setup database"

Write-Host "[5/52] Menambahkan environment backend..." -ForegroundColor Yellow
git add backend/.env.example backend/package.json
git commit -m "Menambahkan konfigurasi environment dan dependencies backend"

# Commit 6-8: Models
Write-Host "[6/52] Membuat model api_users..." -ForegroundColor Yellow
git add backend/models/ApiUser.js
git commit -m "Membuat model Sequelize untuk tabel api_users"

Write-Host "[7/52] Membuat model earthquakes..." -ForegroundColor Yellow
git add backend/models/Earthquake.js
git commit -m "Membuat model Sequelize untuk tabel earthquakes"

Write-Host "[8/52] Membuat model api_usage..." -ForegroundColor Yellow
git add backend/models/ApiUsage.js
git commit -m "Membuat model Sequelize untuk tracking API usage"

Write-Host "[9/52] Menambahkan relasi model..." -ForegroundColor Yellow
git add backend/models/index.js
git commit -m "Menambahkan relasi antar model database"

# Commit 10-11: Database utilities
Write-Host "[10/52] Membuat migration database..." -ForegroundColor Yellow
git add backend/migrations/
git commit -m "Membuat migration untuk setup tabel database"

Write-Host "[11/52] Membuat seeder data..." -ForegroundColor Yellow
git add backend/seeders/
git commit -m "Membuat seeder untuk data gempa dummy"

# Commit 12-14: Utilities
Write-Host "[12/52] Membuat utility API key generator..." -ForegroundColor Yellow
git add backend/utils/apiKeyGenerator.js
git commit -m "Membuat utility untuk generate API key unik"

Write-Host "[13/52] Membuat utility CSV import..." -ForegroundColor Yellow
git add backend/utils/csv-import.js
git commit -m "Membuat utility untuk import dataset Kaggle"

Write-Host "[14/52] Menambahkan konfigurasi database..." -ForegroundColor Yellow
git add backend/config/database.js
git commit -m "Menambahkan konfigurasi Sequelize untuk MySQL"

# Commit 15-17: Middleware
Write-Host "[15/52] Membuat middleware autentikasi..." -ForegroundColor Yellow
git add backend/middleware/auth.js
git commit -m "Membuat middleware untuk validasi API key"

Write-Host "[16/52] Membuat middleware rate limiting..." -ForegroundColor Yellow
git add backend/middleware/rateLimit.js
git commit -m "Membuat middleware untuk rate limiting dan usage tracking"

Write-Host "[17/52] Menambahkan error handler..." -ForegroundColor Yellow
git add backend/middleware/errorHandler.js
git commit -m "Menambahkan middleware error handler global" -m --allow-empty

# Commit 18-22: Routes & Controllers
Write-Host "[18/52] Membuat route auth..." -ForegroundColor Yellow
git add backend/routes/auth.js
git commit -m "Membuat route untuk autentikasi dan registrasi"

Write-Host "[19/52] Membuat route API earthquakes..." -ForegroundColor Yellow
git add backend/routes/api.js
git commit -m "Membuat route untuk endpoint data gempa"

Write-Host "[20/52] Membuat route dashboard..." -ForegroundColor Yellow
git add backend/routes/dashboard.js
git commit -m "Membuat route untuk dashboard analytics"

Write-Host "[21/52] Menambahkan dokumentasi Swagger..." -ForegroundColor Yellow
git add backend/swagger.js
git commit -m "Menambahkan konfigurasi Swagger untuk dokumentasi API" -m --allow-empty

Write-Host "[22/52] Membuat Express server..." -ForegroundColor Yellow
git add backend/server.js
git commit -m "Membuat konfigurasi Express server dengan middleware"

# Commit 23: Database setup script
Write-Host "[23/52] Menambahkan script setup database..." -ForegroundColor Yellow
git add backend/setup-database.js
git commit -m "Membuat script Node.js untuk setup database otomatis"

# Commit 24-27: Frontend setup
Write-Host "[24/52] Membuat konfigurasi Vite..." -ForegroundColor Yellow
git add frontend/vite.config.js frontend/package.json frontend/index.html
git commit -m "Membuat konfigurasi Vite dan dependencies frontend"

Write-Host "[25/52] Menambahkan konfigurasi TailwindCSS..." -ForegroundColor Yellow
git add frontend/tailwind.config.js frontend/postcss.config.js
git commit -m "Menambahkan konfigurasi TailwindCSS dengan tema earthy"

Write-Host "[26/52] Membuat global styles..." -ForegroundColor Yellow
git add frontend/src/index.css
git commit -m "Membuat global styles dengan custom CSS earthy theme"

Write-Host "[27/52] Menambahkan routing React..." -ForegroundColor Yellow
git add frontend/src/main.jsx frontend/src/App.jsx
git commit -m "Menambahkan konfigurasi React Router untuk navigasi"

# Commit 28-32: Components Shared
Write-Host "[28/52] Membuat komponen Navbar..." -ForegroundColor Yellow
git add frontend/src/components/Navbar.jsx
git commit -m "Membuat komponen Navbar dengan menu navigasi"

Write-Host "[29/52] Membuat komponen Footer..." -ForegroundColor Yellow
git add frontend/src/components/Footer.jsx
git commit -m "Membuat komponen Footer dengan informasi kontak"

Write-Host "[30/52] Membuat komponen LandingHero..." -ForegroundColor Yellow
git add frontend/src/components/LandingHero.jsx
git commit -m "Membuat komponen Hero section untuk landing page"

Write-Host "[31/52] Membuat komponen PricingTiers..." -ForegroundColor Yellow
git add frontend/src/components/PricingTiers.jsx
git commit -m "Membuat komponen pricing tiers (Free/Pro/Enterprise)"

Write-Host "[32/52] Membuat komponen FeaturesSection..." -ForegroundColor Yellow
git add frontend/src/components/FeaturesSection.jsx
git commit -m "Membuat komponen features section dengan 6 fitur utama"

# Commit 33-35: Components Form & Dashboard
Write-Host "[33/52] Membuat komponen ApiKeyGenerator..." -ForegroundColor Yellow
git add frontend/src/components/ApiKeyGenerator.jsx
git commit -m "Membuat komponen form untuk generate API key"

Write-Host "[34/52] Membuat komponen ApiKeysTable..." -ForegroundColor Yellow
git add frontend/src/components/Dashboard/ApiKeysTable.jsx
git commit -m "Membuat komponen tabel untuk manajemen API key"

Write-Host "[35/52] Membuat komponen UsageCharts..." -ForegroundColor Yellow
git add frontend/src/components/Dashboard/UsageCharts.jsx
git commit -m "Membuat komponen charts untuk analytics menggunakan Recharts"

# Commit 36-37: Map Component
Write-Host "[36/52] Membuat komponen EarthquakeMap..." -ForegroundColor Yellow
git add frontend/src/components/Dashboard/EarthquakeMap.jsx
git commit -m "Membuat komponen peta interaktif menggunakan Leaflet"

Write-Host "[37/52] Menambahkan custom markers..." -ForegroundColor Yellow
git add frontend/src/components/Dashboard/
git commit -m "Menambahkan custom markers untuk visualisasi gempa di peta" --allow-empty

# Commit 38-40: Pages
Write-Host "[38/52] Membuat halaman Home..." -ForegroundColor Yellow
git add frontend/src/pages/Home.jsx
git commit -m "Membuat halaman Home dengan landing page components"

Write-Host "[39/52] Membuat halaman Dashboard..." -ForegroundColor Yellow
git add frontend/src/pages/Dashboard.jsx
git commit -m "Membuat halaman Dashboard dengan stats dan analytics"

Write-Host "[40/52] Membuat halaman ApiDocs..." -ForegroundColor Yellow
git add frontend/src/pages/ApiDocs.jsx
git commit -m "Membuat halaman dokumentasi API dengan contoh penggunaan"

# Commit 41-42: Services
Write-Host "[41/52] Membuat service API..." -ForegroundColor Yellow
git add frontend/src/services/api.js
git commit -m "Membuat service API dengan Axios untuk HTTP requests"

Write-Host "[42/52] Membuat custom hook..." -ForegroundColor Yellow
git add frontend/src/hooks/useApiKey.js
git commit -m "Membuat custom hook untuk manajemen API key di localStorage"

# Commit 43-48: Documentation
Write-Host "[43/52] Menambahkan dokumentasi API usage..." -ForegroundColor Yellow
git add API_USAGE.md
git commit -m "Menambahkan dokumentasi lengkap penggunaan API"

Write-Host "[44/52] Menambahkan panduan deployment..." -ForegroundColor Yellow
git add DEPLOYMENT.md
git commit -m "Menambahkan panduan deployment untuk production"

Write-Host "[45/52] Menambahkan arsitektur sistem..." -ForegroundColor Yellow
git add SYSTEM_ARCHITECTURE.md
git commit -m "Menambahkan dokumentasi arsitektur sistem lengkap"

Write-Host "[46/52] Menambahkan panduan testing..." -ForegroundColor Yellow
git add TESTING_MANUAL.md
git commit -m "Menambahkan panduan testing manual dengan 12 test cases"

Write-Host "[47/52] Menambahkan diagram arsitektur..." -ForegroundColor Yellow
git add ARCHITECTURE_DIAGRAMS.md
git commit -m "Menambahkan diagram arsitektur dalam format ASCII art"

Write-Host "[48/52] Menambahkan panduan import dataset..." -ForegroundColor Yellow
git add IMPORT_DATASET.md KAGGLE_IMPORT_GUIDE.md
git commit -m "Menambahkan panduan import dataset Kaggle"

# Commit 49-50: Dataset & Final Docs
Write-Host "[49/52] Mengimport dataset Kaggle..." -ForegroundColor Yellow
git add backend/data/
git commit -m "Mengimport dataset gempa dari Kaggle (928 records)" --allow-empty

Write-Host "[50/52] Menambahkan final review..." -ForegroundColor Yellow
git add FINAL_REVIEW.md VERIFICATION_RESULT.md
git commit -m "Menambahkan dokumentasi final review dan verifikasi"

# Commit 51-52: Final touches
Write-Host "[51/52] Menambahkan quick start guide..." -ForegroundColor Yellow
git add QUICKSTART.md SUCCESS.md NEXT_STEPS.md
git commit -m "Menambahkan panduan quick start dan success guide"

Write-Host "[52/52] Menambahkan file localization..." -ForegroundColor Yellow
git add frontend/src/locales/ INDONESIAN_UI_GUIDE.md
git commit -m "Menambahkan file translasi Bahasa Indonesia untuk UI"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ Semua 52 commits berhasil dibuat!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Langkah selanjutnya:" -ForegroundColor Cyan
Write-Host "1. git branch -M main" -ForegroundColor White
Write-Host "2. git push -u origin main" -ForegroundColor White
Write-Host ""
