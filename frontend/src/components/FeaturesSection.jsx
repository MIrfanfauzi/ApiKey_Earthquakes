import {
    KeyIcon,
    ClockIcon,
    DocumentTextIcon,
    ChartBarIcon,
    ShieldCheckIcon,
    BoltIcon
} from '@heroicons/react/24/outline'

export default function FeaturesSection() {
    const features = [
        {
            icon: KeyIcon,
            title: 'API Key Authentication',
            description: 'Secure access with unique API keys. Easy to generate and manage from your dashboard.'
        },
        {
            icon: ClockIcon,
            title: 'Rate Limiting',
            description: 'Fair usage with tier-based rate limits. Automatic quota management and monitoring.'
        },
        {
            icon: DocumentTextIcon,
            title: 'Swagger Documentation',
            description: 'Interactive API documentation with live testing. Clear examples and response schemas.'
        },
        {
            icon: ChartBarIcon,
            title: 'Usage Analytics',
            description: 'Real-time dashboard with usage statistics, charts, and insights into your API consumption.'
        },
        {
            icon: ShieldCheckIcon,
            title: '99.9% Uptime',
            description: 'Production-ready infrastructure with high availability and reliability guarantees.'
        },
        {
            icon: BoltIcon,
            title: '10+ Endpoints',
            description: 'Comprehensive earthquake data with filtering, search, statistics, and real-time updates.'
        }
    ]

    return (
        <section className="section-padding bg-earth-beige">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-earth-bark mb-4">
                        Production-Ready Features
                    </h2>
                    <p className="text-lg text-earth-bark/70 max-w-2xl mx-auto">
                        Everything you need to build reliable earthquake monitoring applications
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="card p-8 group"
                        >
                            <div className="w-14 h-14 bg-earth-gradient rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="w-7 h-7 text-white" />
                            </div>

                            <h3 className="text-xl font-bold text-earth-bark mb-3">
                                {feature.title}
                            </h3>

                            <p className="text-earth-bark/70">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Additional Features List */}
                <div className="mt-16 card p-8">
                    <h3 className="text-2xl font-bold text-earth-bark mb-6 text-center">
                        What You Get
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <span className="text-earth-forest mr-2">✅</span>
                            <span className="text-earth-bark">RESTful API architecture</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-earth-forest mr-2">✅</span>
                            <span className="text-earth-bark">JSON response format</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-earth-forest mr-2">✅</span>
                            <span className="text-earth-bark">CORS enabled</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-earth-forest mr-2">✅</span>
                            <span className="text-earth-bark">Pagination support</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-earth-forest mr-2">✅</span>
                            <span className="text-earth-bark">Advanced filtering</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-earth-forest mr-2">✅</span>
                            <span className="text-earth-bark">Real-time data updates</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-earth-forest mr-2">✅</span>
                            <span className="text-earth-bark">Historical data access</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-earth-forest mr-2">✅</span>
                            <span className="text-earth-bark">Province-level statistics</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
