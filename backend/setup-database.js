require('dotenv').config();
const mysql = require('mysql2/promise');

async function setupDatabase() {
    console.log('🔧 Starting database setup...\n');

    // Database configuration
    const config = {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
    };

    const dbName = process.env.DB_NAME || 'earthquakes_db';

    try {
        // Connect to MySQL (without database)
        console.log('📡 Connecting to MySQL...');
        const connection = await mysql.createConnection(config);
        console.log('✅ Connected to MySQL\n');

        // Create database
        console.log(`📦 Creating database: ${dbName}`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
        console.log('✅ Database created\n');

        // Use the database
        await connection.query(`USE ${dbName}`);

        // Create api_users table
        console.log('📋 Creating api_users table...');
        await connection.query(`
      CREATE TABLE IF NOT EXISTS api_users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        use_case TEXT,
        api_key VARCHAR(64) UNIQUE NOT NULL,
        calls_today INT DEFAULT 0,
        total_calls INT DEFAULT 0,
        quota INT DEFAULT 1000,
        tier ENUM('free', 'pro', 'enterprise') DEFAULT 'free',
        last_used DATETIME,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_api_key (api_key),
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
        console.log('✅ api_users table created\n');

        // Create earthquakes table
        console.log('📋 Creating earthquakes table...');
        await connection.query(`
      CREATE TABLE IF NOT EXISTS earthquakes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        tgl DATE NOT NULL,
        ot TIME,
        latitude DECIMAL(10,6) NOT NULL,
        longitude DECIMAL(11,6) NOT NULL,
        kedalaman_km INT,
        magnitudo DECIMAL(3,2) NOT NULL,
        type_magnitudo VARCHAR(10),
        wilayah VARCHAR(255) NOT NULL,
        remark TEXT,
        provinsi VARCHAR(100),
        kota VARCHAR(100),
        dirasakan VARCHAR(255),
        sumber VARCHAR(50) DEFAULT 'BMKG',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_tgl (tgl),
        INDEX idx_magnitudo (magnitudo),
        INDEX idx_wilayah (wilayah),
        INDEX idx_provinsi (provinsi)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
        console.log('✅ earthquakes table created\n');

        // Create api_usage table
        console.log('📋 Creating api_usage table...');
        await connection.query(`
      CREATE TABLE IF NOT EXISTS api_usage (
        id INT PRIMARY KEY AUTO_INCREMENT,
        api_user_id INT NOT NULL,
        endpoint VARCHAR(255) NOT NULL,
        method VARCHAR(10) NOT NULL,
        status_code INT NOT NULL,
        response_time_ms INT,
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (api_user_id) REFERENCES api_users(id) ON DELETE CASCADE,
        INDEX idx_api_user_id (api_user_id),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
        console.log('✅ api_usage table created\n');

        await connection.end();

        console.log('🎉 Database setup completed successfully!\n');
        console.log('Next steps:');
        console.log('1. Run: npm run seed (to add sample data)');
        console.log('2. Run: npm run dev (to start the server)\n');

    } catch (error) {
        console.error('❌ Error setting up database:', error.message);
        console.error('\nTroubleshooting:');
        console.error('1. Make sure MySQL is running');
        console.error('2. Check your .env file for correct credentials');
        console.error('3. Verify DB_PASSWORD is correct\n');
        process.exit(1);
    }
}

setupDatabase();
