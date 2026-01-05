const sequelize = require('../config/database');

async function runMigrations() {
    try {
        console.log('🔄 Running database migrations...');

        // Create api_users table
        await sequelize.query(`
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

        console.log('✅ Created api_users table');

        // Create earthquakes table
        await sequelize.query(`
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

        console.log('✅ Created earthquakes table');

        // Create api_usage table
        await sequelize.query(`
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

        console.log('✅ Created api_usage table');

        console.log('✅ All migrations completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

runMigrations();
