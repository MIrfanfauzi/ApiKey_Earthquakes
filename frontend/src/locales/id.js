// Indonesian language translations
export const id = {
    // Navbar
    nav: {
        home: 'Beranda',
        apiDocs: 'Dokumentasi API',
        dashboard: 'Dasbor',
        getApiKey: 'Dapatkan API Key'
    },

    // Hero Section
    hero: {
        badge: '🌍 Didukung oleh Data BMKG',
        title: 'API Gempa Indonesia',
        subtitle: 'Data BMKG Real-time & Historis',
        description: 'API siap produksi dengan',
        uptime: '99.9% Uptime',
        btnGetKey: 'Dapatkan API Key Gratis',
        btnDocs: 'Dokumentasi API',
        stats: {
            endpoints: 'Endpoint API',
            uptime: 'Uptime',
            calls: 'Panggilan Gratis/Bulan',
            access: 'Akses API'
        }
    },

    // Features
    features: {
        title: 'Fitur Siap Produksi',
        subtitle: 'Semua yang Anda butuhkan untuk membangun aplikasi monitoring gempa yang andal',
        list: {
            apiKey: {
                title: 'Autentikasi API Key',
                desc: 'Akses aman dengan API key unik. Mudah dibuat dan dikelola dari dasbor Anda.'
            },
            rateLimit: {
                title: 'Pembatasan Rate',
                desc: 'Penggunaan adil dengan batas rate berbasis tier. Manajemen dan monitoring kuota otomatis.'
            },
            swagger: {
                title: 'Dokumentasi Swagger',
                desc: 'Dokumentasi API interaktif dengan pengujian langsung. Contoh jelas dan skema respons.'
            },
            analytics: {
                title: 'Analitik Penggunaan',
                desc: 'Dasbor real-time dengan statistik penggunaan, grafik, dan wawasan konsumsi API Anda.'
            },
            uptime: {
                title: '99.9% Uptime',
                desc: 'Infrastruktur siap produksi dengan ketersediaan tinggi dan jaminan keandalan.'
            },
            endpoints: {
                title: '10+ Endpoint',
                desc: 'Data gempa komprehensif dengan filtering, pencarian, statistik, dan update real-time.'
            }
        },
        whatYouGet: 'Yang Anda Dapatkan'
    },

    // Pricing
    pricing: {
        title: 'Harga Sederhana dan Transparan',
        subtitle: 'Pilih paket yang sesuai kebutuhan Anda. Mulai gratis, upgrade kapan saja.',
        tiers: {
            free: {
                name: 'Gratis',
                price: 'Rp 0',
                period: 'selamanya',
                desc: 'Sempurna untuk testing dan proyek kecil',
                cta: 'Mulai Gratis'
            },
            pro: {
                name: 'Pro',
                price: 'Rp 150.000',
                period: 'per bulan',
                desc: 'Untuk aplikasi produksi',
                cta: 'Upgrade ke Pro',
                popular: 'Paling Populer'
            },
            enterprise: {
                name: 'Enterprise',
                price: 'Custom',
                period: 'hubungi kami',
                desc: 'Untuk deployment skala besar',
                cta: 'Hubungi Sales'
            }
        },
        features: {
            calls: 'panggilan API/bulan',
            data: 'data gempa',
            support: 'dukungan',
            rateLimit: 'Rate limiting',
            filtering: 'Filtering lanjutan',
            analytics: 'Dasbor analitik',
            sla: 'Jaminan SLA',
            unlimited: 'Tidak terbatas',
            dedicated: 'Infrastruktur dedicated',
            phone: 'Dukungan telepon 24/7',
            custom: 'Rate limit custom',
            whiteLabel: 'Opsi white-label',
            integrations: 'Integrasi custom',
            manager: 'Account manager dedicated'
        },
        note: 'Semua paket termasuk autentikasi API key, rate limiting, dan akses ke dokumentasi Swagger kami.'
    },

    // API Key Generator
    apiKeyGen: {
        title: 'Dapatkan API Key Gratis Anda',
        subtitle: 'Mulai akses data gempa dalam hitungan detik. Tidak perlu kartu kredit.',
        form: {
            email: 'Alamat Email',
            name: 'Nama Lengkap',
            company: 'Perusahaan/Organisasi (Opsional)',
            useCase: 'Kasus Penggunaan (Opsional)',
            useCasePlaceholder: 'Jelaskan bagaimana Anda berencana menggunakan API...',
            btnSubmit: 'Generate API Key',
            btnSubmitting: 'Generating...'
        },
        success: {
            title: 'API Key Berhasil Dibuat!',
            message: 'API key Anda telah dibuat dan disimpan. Simpan dengan aman!',
            btnCopy: 'Salin',
            btnDashboard: 'Ke Dasbor →',
            tier: 'Tier',
            quota: 'Kuota',
            note: 'Silakan simpan API key Anda dengan aman. Anda akan memerlukannya untuk semua permintaan API.'
        },
        error: {
            title: 'Error',
            validation: 'Error Validasi',
            conflict: 'Email sudah terdaftar. Gunakan email berbeda atau ambil API key yang sudah ada.',
            failed: 'Gagal membuat API key'
        },
        terms: 'Dengan mendaftar, Anda menyetujui syarat layanan dan kebijakan privasi kami.'
    },

    // Dashboard
    dashboard: {
        title: 'Dasbor',
        welcome: 'Selamat datang kembali',
        loading: 'Memuat dasbor...',
        stats: {
            tier: 'Tier',
            callsToday: 'Panggilan Hari Ini',
            remaining: 'Tersisa',
            totalCalls: 'Total Panggilan'
        },
        apiKeys: {
            title: 'Manajemen API Key',
            btnRegenerate: 'Regenerate Key',
            regenerating: 'Regenerating...',
            table: {
                apiKey: 'API Key',
                callsToday: 'Panggilan Hari Ini',
                quotaLeft: 'Kuota Tersisa',
                lastUsed: 'Terakhir Digunakan',
                actions: 'Aksi',
                show: 'Tampilkan',
                hide: 'Sembunyikan',
                copy: 'Salin',
                never: 'Belum Pernah'
            },
            accountInfo: 'Informasi Akun',
            email: 'Email',
            name: 'Nama',
            tier: 'Tier',
            monthlyQuota: 'Kuota Bulanan'
        },
        usage: {
            title: 'Analitik Penggunaan',
            chartTitle: 'Panggilan API (30 Hari Terakhir)',
            noData: 'Belum ada data penggunaan. Mulai membuat panggilan API untuk melihat analitik Anda!',
            totalCalls: 'Total Panggilan (30 hari)',
            avgPerDay: 'Rata-rata per Hari',
            peakDay: 'Hari Puncak'
        },
        map: {
            title: 'Gempa Kuat Terkini',
            subtitle: 'Menampilkan gempa dengan magnitudo ≥ 4.0 dari 7 hari terakhir',
            btnRefresh: 'Refresh',
            loading: 'Memuat peta...',
            noData: 'Tidak ada gempa kuat terkini',
            showing: 'Menampilkan',
            earthquakes: 'gempa di peta',
            popupLocation: 'Lokasi',
            popupDate: 'Tanggal',
            popupDepth: 'Kedalaman',
            popupMagnitude: 'Magnitudo'
        }
    },

    // API Docs
    docs: {
        title: 'Dokumentasi API',
        subtitle: 'Panduan lengkap menggunakan API Gempa Indonesia',
        btnSwagger: 'Dokumentasi Swagger Interaktif',
        btnHealth: 'Cek Kesehatan API',
        quickStart: {
            title: 'Mulai Cepat',
            step1: {
                title: '1. Dapatkan API Key Anda',
                desc: 'Daftar di halaman beranda untuk menerima API key gratis Anda.'
            },
            step2: {
                title: '2. Buat Permintaan Pertama Anda',
                desc: 'Sertakan API key Anda di header'
            },
            step3: {
                title: '3. Tangani Respons',
                desc: 'Semua respons dalam format JSON. Periksa kode status dan tangani error dengan tepat.'
            }
        },
        auth: {
            title: 'Autentikasi',
            desc: 'Semua endpoint API (kecuali registrasi) memerlukan autentikasi melalui API key.',
            headerFormat: 'Format Header:',
            errors: {
                unauthorized: 'API key hilang atau tidak valid',
                rateLimit: 'Batas rate terlampaui'
            }
        },
        endpoints: {
            title: 'Endpoint',
            requiresAuth: '🔒 Memerlukan API Key',
            queryParams: 'Parameter Query:',
            example: 'Contoh Permintaan:'
        },
        rateLimit: {
            title: 'Pembatasan Rate',
            free: 'Tier Gratis',
            pro: 'Tier Pro',
            enterprise: 'Tier Enterprise',
            perHour: 'permintaan per jam',
            perMonth: 'per bulan',
            unlimited: 'Permintaan tidak terbatas',
            headers: 'Header Informasi Rate Limit:'
        },
        responseFormat: {
            title: 'Format Respons',
            desc: 'Semua respons sukses mengikuti struktur ini:'
        }
    },

    // Footer
    footer: {
        about: {
            desc: 'Data gempa real-time dan historis dari BMKG dengan uptime 99.9%. API siap produksi untuk developer, peneliti, dan organisasi.',
            dataSource: 'Sumber Data: BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)'
        },
        quickLinks: 'Tautan Cepat',
        resources: 'Sumber Daya',
        copyright: 'API Gempa Indonesia. Dibuat untuk tujuan edukasi.',
        madeWith: 'Dibuat dengan 🌿 menggunakan Node.js, React, dan TailwindCSS'
    },

    // Common
    common: {
        loading: 'Memuat...',
        error: 'Error',
        success: 'Berhasil',
        retry: 'Coba Lagi',
        close: 'Tutup',
        save: 'Simpan',
        cancel: 'Batal',
        delete: 'Hapus',
        edit: 'Edit',
        view: 'Lihat',
        download: 'Unduh',
        upload: 'Unggah',
        search: 'Cari',
        filter: 'Filter',
        sort: 'Urutkan',
        next: 'Selanjutnya',
        previous: 'Sebelumnya',
        page: 'Halaman',
        of: 'dari',
        showing: 'Menampilkan',
        results: 'hasil',
        noResults: 'Tidak ada hasil',
        all: 'Semua',
        yes: 'Ya',
        no: 'Tidak'
    }
};

export default id;
