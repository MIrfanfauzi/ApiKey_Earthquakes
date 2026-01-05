import { useState } from 'react'
import api from '../services/api'
import { useApiKey } from '../hooks/useApiKey'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

export default function ApiKeyGenerator() {
    const { saveApiKey } = useApiKey()
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        company: '',
        use_case: ''
    })
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setResult(null)

        try {
            const response = await api.post('/api/auth/register', formData)
            setResult(response.data)
            saveApiKey(response.data.api_key)

            // Reset form
            setFormData({
                email: '',
                name: '',
                company: '',
                use_case: ''
            })
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate API key')
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        alert('API key copied to clipboard!')
    }

    return (
        <section id="get-started" className="section-padding bg-white">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-earth-bark mb-4">
                        Get Your Free API Key
                    </h2>
                    <p className="text-lg text-earth-bark/70">
                        Start accessing earthquake data in seconds. No credit card required.
                    </p>
                </div>

                {/* Success Message */}
                {result && (
                    <div className="mb-8 p-6 bg-green-50 border-2 border-green-500 rounded-lg">
                        <div className="flex items-start">
                            <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                            <div className="flex-grow">
                                <h3 className="text-lg font-bold text-green-800 mb-2">
                                    API Key Generated Successfully!
                                </h3>
                                <p className="text-green-700 mb-4">
                                    Your API key has been created and saved. Keep it secure!
                                </p>
                                <div className="bg-white p-4 rounded border border-green-300">
                                    <div className="flex items-center justify-between">
                                        <code className="text-sm text-earth-bark break-all">
                                            {result.api_key}
                                        </code>
                                        <button
                                            onClick={() => copyToClipboard(result.api_key)}
                                            className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex-shrink-0"
                                        >
                                            Copy
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4 text-sm text-green-700">
                                    <p><strong>Tier:</strong> {result.tier}</p>
                                    <p><strong>Quota:</strong> {result.quota} calls/month</p>
                                </div>
                                <div className="mt-4">
                                    <a
                                        href="/dashboard"
                                        className="inline-block px-6 py-2 bg-earth-gradient text-white rounded-lg font-semibold hover:shadow-earth-lg transition-all"
                                    >
                                        Go to Dashboard →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-8 p-6 bg-red-50 border-2 border-red-500 rounded-lg">
                        <div className="flex items-start">
                            <XCircleIcon className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-lg font-bold text-red-800 mb-2">Error</h3>
                                <p className="text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Registration Form */}
                <div className="card p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-earth-bark mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="input-earth"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-earth-bark mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="input-earth"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="company" className="block text-sm font-semibold text-earth-bark mb-2">
                                Company/Organization (Optional)
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="input-earth"
                                placeholder="Tech Corp"
                            />
                        </div>

                        <div>
                            <label htmlFor="use_case" className="block text-sm font-semibold text-earth-bark mb-2">
                                Use Case (Optional)
                            </label>
                            <textarea
                                id="use_case"
                                name="use_case"
                                value={formData.use_case}
                                onChange={handleChange}
                                rows="3"
                                className="input-earth"
                                placeholder="Describe how you plan to use the API..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Generating...' : 'Generate API Key'}
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-center text-earth-bark/60">
                        By registering, you agree to our terms of service and privacy policy.
                    </p>
                </div>
            </div>
        </section>
    )
}
