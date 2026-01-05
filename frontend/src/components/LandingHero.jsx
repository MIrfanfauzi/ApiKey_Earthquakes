import { RocketLaunchIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function LandingHero() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-earth-beige via-earth-sand to-earth-tan">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #2D5016 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-earth mb-6 animate-float">
                        <span className="text-earth-forest font-semibold text-sm">
                            🌍 Didukung oleh Data BMKG
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-earth-bark mb-6 text-shadow">
                        API Gempa Indonesia
                    </h1>

                    <p className="text-xl md:text-2xl text-earth-brown mb-4 max-w-3xl mx-auto">
                        Data BMKG Real-time & Historis
                    </p>

                    <p className="text-lg md:text-xl text-earth-bark/80 mb-8 max-w-2xl mx-auto">
                        API siap produksi dengan <span className="font-bold text-earth-forest">99.9% Uptime</span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <a
                            href="#get-started"
                            className="btn-primary btn-pulse w-full sm:w-auto text-center"
                        >
                            <RocketLaunchIcon className="inline-block w-5 h-5 mr-2" />
                            Dapatkan API Key Gratis
                        </a>
                        <a
                            href="/docs"
                            className="btn-secondary w-full sm:w-auto text-center"
                        >
                            <ChartBarIcon className="inline-block w-5 h-5 mr-2" />
                            Dokumentasi API
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        <div className="card p-6">
                            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">10+</div>
                            <div className="text-sm text-earth-bark/70">Endpoint API</div>
                        </div>
                        <div className="card p-6">
                            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">99.9%</div>
                            <div className="text-sm text-earth-bark/70">Uptime SLA</div>
                        </div>
                        <div className="card p-6">
                            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">1K+</div>
                            <div className="text-sm text-earth-bark/70">Panggilan Gratis/Bulan</div>
                        </div>
                        <div className="card p-6">
                            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">24/7</div>
                            <div className="text-sm text-earth-bark/70">Akses API</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave Divider */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
                </svg>
            </div>
        </div>
    )
}
