# Quick Setup Guide

Follow these steps to get the Earthquake Indonesia API running locally.

## Step 1: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Step 2: Configure Environment

### Backend Environment

Copy the example file and edit it:
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your MySQL credentials:
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=earthquakes_db
DB_USER=root
DB_PASSWORD=your_mysql_password_here
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
API_KEY_PREFIX=sk_eq_id_
RATE_LIMIT_WINDOW_MS=3600000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=http://localhost:5173
```

**Important:** Replace `your_mysql_password_here` with your actual MySQL password!

## Step 3: Setup Database

### Create Database
```bash
mysql -u root -p < database-setup.sql
```

Or manually in MySQL:
```sql
CREATE DATABASE earthquakes_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Run Migrations
```bash
cd backend
npm run migrate
```

### Seed Data
```bash
npm run seed
```

## Step 4: Start Servers

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Backend will run on http://localhost:5000

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Frontend will run on http://localhost:5173

## Step 5: Test the Application

1. Open browser: http://localhost:5173
2. Register for an API key
3. Go to Dashboard to see your API key
4. Visit API Docs: http://localhost:5000/api-docs

## Quick Test Commands

### Test API without key (should return 401)
```bash
curl http://localhost:5000/api/earthquakes
```

### Register for API key
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "company": "Test Corp",
    "use_case": "Testing API"
  }'
```

### Test with API key (replace with your key)
```bash
curl -X GET "http://localhost:5000/api/earthquakes?limit=5" \
  -H "api-key: sk_eq_id_xxxxxxxxxxxxx"
```

## Troubleshooting

### MySQL Connection Error
- Check if MySQL is running: `sudo service mysql status`
- Verify credentials in `backend/.env`
- Ensure database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Port Already in Use
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change port in `frontend/vite.config.js`

### CORS Error
- Ensure `CORS_ORIGIN` in backend `.env` matches frontend URL
- Default: `http://localhost:5173`

### Dependencies Error
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Project Structure

```
EarthquakesWeb/
├── backend/              # Express API server
│   ├── config/          # Database config
│   ├── middleware/      # Auth & rate limiting
│   ├── models/          # Sequelize models
│   ├── routes/          # API routes
│   ├── utils/           # Utilities
│   ├── migrations/      # DB migrations
│   ├── seeders/         # Seed data
│   ├── .env            # Environment variables (create this!)
│   └── server.js        # Main server file
├── frontend/            # React app
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   └── services/   # API service
│   └── index.html
├── database-setup.sql   # Database schema
├── README.md           # Full documentation
└── SETUP.md            # This file
```

## Next Steps

1. ✅ Register for an API key on the homepage
2. ✅ Explore the dashboard to see usage statistics
3. ✅ Read API documentation at http://localhost:5000/api-docs
4. ✅ Make API requests and build your application!

## Need Help?

- Check `README.md` for detailed documentation
- Check `API_USAGE.md` for API examples
- Check `DEPLOYMENT.md` for production deployment

---

**Happy Coding! 🚀**
