const { Earthquake } = require('../models');

async function seedEarthquakes() {
    try {
        console.log('🌱 Seeding earthquake data...');

        const earthquakes = [
            {
                tgl: '2026-01-04',
                ot: '14:30:00',
                latitude: -6.2088,
                longitude: 106.8456,
                kedalaman_km: 10,
                magnitudo: 5.2,
                type_magnitudo: 'Mw',
                wilayah: 'Jakarta Selatan',
                remark: 'Gempa terasa hingga radius 50 km',
                provinsi: 'DKI Jakarta',
                kota: 'Jakarta',
                dirasakan: 'III-IV MMI',
                sumber: 'BMKG'
            },
            {
                tgl: '2026-01-03',
                ot: '08:15:22',
                latitude: -7.7956,
                longitude: 110.3695,
                kedalaman_km: 15,
                magnitudo: 6.8,
                type_magnitudo: 'Mw',
                wilayah: 'Yogyakarta',
                remark: 'Gempa besar, berpotensi tsunami',
                provinsi: 'DI Yogyakarta',
                kota: 'Yogyakarta',
                dirasakan: 'VI-VII MMI',
                sumber: 'BMKG'
            },
            {
                tgl: '2026-01-02',
                ot: '23:45:10',
                latitude: -8.6500,
                longitude: 115.2167,
                kedalaman_km: 20,
                magnitudo: 5.5,
                type_magnitudo: 'Mb',
                wilayah: 'Bali Timur',
                remark: 'Gempa dirasakan kuat',
                provinsi: 'Bali',
                kota: 'Denpasar',
                dirasakan: 'IV-V MMI',
                sumber: 'BMKG'
            },
            {
                tgl: '2026-01-01',
                ot: '12:00:00',
                latitude: 3.5952,
                longitude: 98.6722,
                kedalaman_km: 30,
                magnitudo: 4.8,
                type_magnitudo: 'Mw',
                wilayah: 'Sumatera Utara',
                remark: 'Gempa ringan',
                provinsi: 'Sumatera Utara',
                kota: 'Medan',
                dirasakan: 'II-III MMI',
                sumber: 'BMKG'
            },
            {
                tgl: '2025-12-31',
                ot: '18:30:45',
                latitude: -0.9471,
                longitude: 119.8707,
                kedalaman_km: 25,
                magnitudo: 6.2,
                type_magnitudo: 'Mw',
                wilayah: 'Sulawesi Tengah',
                remark: 'Gempa signifikan',
                provinsi: 'Sulawesi Tengah',
                kota: 'Palu',
                dirasakan: 'V-VI MMI',
                sumber: 'BMKG'
            },
            {
                tgl: '2025-12-30',
                ot: '06:20:15',
                latitude: -2.5489,
                longitude: 118.0149,
                kedalaman_km: 18,
                magnitudo: 5.0,
                type_magnitudo: 'Mb',
                wilayah: 'Sulawesi Selatan',
                remark: 'Gempa sedang',
                provinsi: 'Sulawesi Selatan',
                kota: 'Makassar',
                dirasakan: 'III-IV MMI',
                sumber: 'BMKG'
            },
            {
                tgl: '2025-12-29',
                ot: '15:10:30',
                latitude: -3.3194,
                longitude: 114.5906,
                kedalaman_km: 12,
                magnitudo: 4.5,
                type_magnitudo: 'Ml',
                wilayah: 'Kalimantan Selatan',
                remark: 'Gempa ringan',
                provinsi: 'Kalimantan Selatan',
                kota: 'Banjarmasin',
                dirasakan: 'II MMI',
                sumber: 'BMKG'
            },
            {
                tgl: '2025-12-28',
                ot: '21:45:00',
                latitude: -7.2575,
                longitude: 112.7521,
                kedalaman_km: 22,
                magnitudo: 5.8,
                type_magnitudo: 'Mw',
                wilayah: 'Jawa Timur',
                remark: 'Gempa kuat',
                provinsi: 'Jawa Timur',
                kota: 'Surabaya',
                dirasakan: 'IV-V MMI',
                sumber: 'BMKG'
            },
            {
                tgl: '2025-12-27',
                ot: '10:30:20',
                latitude: -6.9175,
                longitude: 107.6191,
                kedalaman_km: 8,
                magnitudo: 4.2,
                type_magnitudo: 'Ml',
                wilayah: 'Jawa Barat',
                remark: 'Gempa dangkal',
                provinsi: 'Jawa Barat',
                kota: 'Bandung',
                dirasakan: 'III MMI',
                sumber: 'BMKG'
            },
            {
                tgl: '2025-12-26',
                ot: '03:15:55',
                latitude: 5.5483,
                longitude: 95.3238,
                kedalaman_km: 35,
                magnitudo: 7.1,
                type_magnitudo: 'Mw',
                wilayah: 'Aceh',
                remark: 'Gempa sangat besar, peringatan tsunami',
                provinsi: 'Aceh',
                kota: 'Banda Aceh',
                dirasakan: 'VII-VIII MMI',
                sumber: 'BMKG'
            },
            {
                tgl: '2025-12-25',
                ot: '16:40:10',
                latitude: -8.3405,
                longitude: 115.0920,
                kedalaman_km: 14,
                magnitudo: 5.3,
                type_magnitudo: 'Mb',
                wilayah: 'Bali Barat',
                remark: 'Gempa sedang',
                provinsi: 'Bali',
                kota: 'Denpasar',
                dirasakan: 'IV MMI',
                sumber: 'BMKG'
            },
            {
                tgl: '2025-12-24',
                ot: '09:25:30',
                latitude: -2.9761,
                longitude: 104.7754,
                kedalaman_km: 28,
                magnitudo: 4.9,
                type_magnitudo: 'Ml',
                wilayah: 'Sumatera Selatan',
                remark: 'Gempa ringan-sedang',
                provinsi: 'Sumatera Selatan',
                kota: 'Palembang',
                dirasakan: 'III MMI',
                sumber: 'BMKG'
            }
        ];

        const result = await Earthquake.bulkCreate(earthquakes, {
            ignoreDuplicates: true
        });

        console.log(`✅ Successfully seeded ${result.length} earthquake records`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

seedEarthquakes();
