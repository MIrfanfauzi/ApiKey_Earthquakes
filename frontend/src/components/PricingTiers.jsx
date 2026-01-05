import { CheckIcon } from '@heroicons/react/24/solid'

export default function PricingTiers() {
    const tiers = [
        {
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
            cta: 'Get Started Free',
            highlighted: false
        },
        {
            name: 'Pro',
            price: '$9.99',
            period: 'per month',
            description: 'For production applications',
            features: [
                '50,000 API calls/month',
                'Full earthquake data access',
                'Priority email support',
                'Rate limiting: 1000/hour',
                'Advanced filtering',
                'Usage analytics dashboard',
                'SLA guarantee'
            ],
            cta: 'Upgrade to Pro',
            highlighted: true
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: 'contact us',
            description: 'For large-scale deployments',
            features: [
                'Unlimited API calls',
                'Dedicated infrastructure',
                '24/7 phone support',
                'Custom rate limits',
                'White-label options',
                'Custom integrations',
                'SLA with uptime guarantee',
                'Dedicated account manager'
            ],
            cta: 'Contact Sales',
            highlighted: false
        }
    ]

    return (
        <section id="pricing" className="section-padding bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-earth-bark mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-earth-bark/70 max-w-2xl mx-auto">
                        Choose the plan that fits your needs. Start free, upgrade anytime.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`card p-8 ${tier.highlighted
                                    ? 'ring-4 ring-earth-forest scale-105 bg-gradient-to-br from-white to-earth-beige'
                                    : ''
                                }`}
                        >
                            {tier.highlighted && (
                                <div className="bg-earth-gradient text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                                    Most Popular
                                </div>
                            )}

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
                                className={`block text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${tier.highlighted
                                        ? 'bg-earth-gradient text-white shadow-earth hover:shadow-earth-lg'
                                        : 'bg-white text-earth-forest border-2 border-earth-forest hover:bg-earth-forest hover:text-white'
                                    }`}
                            >
                                {tier.cta}
                            </a>
                        </div>
                    ))}
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
