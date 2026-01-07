import { CheckIcon } from '@heroicons/react/24/solid'

export default function PricingTiers() {
    const tier = {
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Perfect for testing and small projects',
        features: [
            '1,000 API calls/month',
            'Basic earthquake data',
            'Community support',
            'Rate limiting: 100/hour',
            'API key authentication'
        ],
        cta: 'Get Started Free'
    }

    return (
        <section id="pricing" className="section-padding bg-white">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-earth-bark mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-earth-bark/70 max-w-2xl mx-auto">
                        Get started with our free tier. No credit card required.
                    </p>
                </div>

                {/* Single Pricing Card */}
                <div className="max-w-2xl mx-auto">
                    <div className="card p-8 bg-gradient-to-br from-white to-earth-beige">
                        <h3 className="text-2xl font-bold text-earth-bark mb-2">{tier.name}</h3>

                        <div className="mb-4">
                            <span className="text-4xl font-bold text-gradient">{tier.price}</span>
                            <span className="text-earth-bark/60 ml-2">/ {tier.period}</span>
                        </div>

                        <p className="text-earth-bark/70 mb-6">{tier.description}</p>

                        <ul className="space-y-3 mb-8">
                            {tier.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckIcon className="w-5 h-5 text-earth-forest mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-earth-bark">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <a
                            href="#get-started"
                            className="block text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 bg-earth-gradient text-white shadow-earth hover:shadow-earth-lg"
                        >
                            {tier.cta}
                        </a>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-12 text-center">
                    <p className="text-earth-bark/60">
                        All plans include API key authentication, rate limiting, and access to our Swagger documentation.
                    </p>
                </div>
            </div>
        </section>
    )
}
