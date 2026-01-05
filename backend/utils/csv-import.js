const fs = require('fs');
const csv = require('csv-parser');
const { Earthquake } = require('../models');

/**
 * Import earthquake data from CSV file
 * @param {string} filePath - Path to CSV file
 * @returns {Promise<number>} Number of records imported
 */
async function importFromCSV(filePath) {
    return new Promise((resolve, reject) => {
        const earthquakes = [];
        let count = 0;

        if (!fs.existsSync(filePath)) {
            return reject(new Error(`File not found: ${filePath}`));
        }

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                // Map CSV columns to database fields
                // Adjust column names based on actual Kaggle CSV structure
                const earthquake = {
                    tgl: row.tgl || row.date || row.tanggal,
                    ot: row.ot || row.origin_time || null,
                    latitude: parseFloat(row.latitude || row.lat || row.lintang),
                    longitude: parseFloat(row.longitude || row.lon || row.bujur),
                    kedalaman_km: parseInt(row.depth || row.kedalaman || row.kedalaman_km) || null,
                    magnitudo: parseFloat(row.mag || row.magnitude || row.magnitudo),
                    type_magnitudo: row.type || row.type_magnitude || null,
                    wilayah: row.wilayah || row.region || row.area || '',
                    remark: row.remark || row.keterangan || null,
                    provinsi: row.provinsi || row.province || extractProvince(row.wilayah || row.region),
                    kota: row.kota || row.city || null,
                    dirasakan: row.dirasakan || row.felt || null,
                    sumber: row.sumber || row.source || 'BMKG'
                };

                earthquakes.push(earthquake);
            })
            .on('end', async () => {
                try {
                    // Bulk insert earthquakes
                    const result = await Earthquake.bulkCreate(earthquakes, {
                        ignoreDuplicates: true,
                        validate: true
                    });

                    console.log(`✅ Successfully imported ${result.length} earthquake records`);
                    resolve(result.length);
                } catch (error) {
                    console.error('Error inserting data:', error);
                    reject(error);
                }
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

/**
 * Extract province name from wilayah string
 * @param {string} wilayah - Region string
 * @returns {string|null} Province name
 */
function extractProvince(wilayah) {
    if (!wilayah) return null;

    const provinces = [
        'Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Jambi', 'Sumatera Selatan',
        'Bengkulu', 'Lampung', 'Kepulauan Bangka Belitung', 'Kepulauan Riau',
        'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur',
        'Banten', 'Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur',
        'Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara',
        'Sulawesi Utara', 'Sulawesi Tengah', 'Sulawesi Selatan', 'Sulawesi Tenggara', 'Gorontalo', 'Sulawesi Barat',
        'Maluku', 'Maluku Utara', 'Papua', 'Papua Barat', 'Papua Selatan', 'Papua Tengah', 'Papua Pegunungan'
    ];

    for (const province of provinces) {
        if (wilayah.includes(province)) {
            return province;
        }
    }

    return null;
}

// Run import if called directly
if (require.main === module) {
    const filePath = process.env.KAGGLE_CSV_PATH || './data/earthquakes.csv';

    console.log(`📥 Starting CSV import from: ${filePath}`);

    importFromCSV(filePath)
        .then(count => {
            console.log(`✅ Import completed: ${count} records`);
            process.exit(0);
        })
        .catch(error => {
            console.error('❌ Import failed:', error.message);
            process.exit(1);
        });
}

module.exports = {
    importFromCSV,
    extractProvince
};
