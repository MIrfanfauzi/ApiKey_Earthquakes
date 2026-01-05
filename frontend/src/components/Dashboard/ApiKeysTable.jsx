import { useState } from 'react'
import { KeyIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import api from '../../services/api'

export default function ApiKeysTable({ user, quota }) {
    const [showKey, setShowKey] = useState(false)
    const [regenerating, setRegenerating] = useState(false)

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        alert('API key copied to clipboard!')
    }

    const handleRegenerateKey = async () => {
        if (!confirm('Are you sure you want to regenerate your API key? Your old key will be invalidated.')) {
            return
        }

        setRegenerating(true)
        try {
            const response = await api.post('/api/dashboard/regenerate-key')
            alert('API key regenerated successfully! Please update your applications.')
            localStorage.setItem('earthquake_api_key', response.data.api_key)
            window.location.reload()
        } catch (error) {
            alert('Failed to regenerate API key: ' + (error.response?.data?.message || error.message))
        } finally {
            setRegenerating(false)
        }
    }

    const maskApiKey = (key) => {
        if (!key) return ''
        return key.substring(0, 12) + '••••••••••••••••••••••••••••••••'
    }

    return (
        <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-earth-bark flex items-center">
                    <KeyIcon className="w-6 h-6 mr-2" />
                    API Key Management
                </h2>
                <button
                    onClick={handleRegenerateKey}
                    disabled={regenerating}
                    className="btn-secondary text-sm flex items-center disabled:opacity-50"
                >
                    <ArrowPathIcon className={`w-4 h-4 mr-2 ${regenerating ? 'animate-spin' : ''}`} />
                    Regenerate Key
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-earth-tan">
                            <th className="text-left py-3 px-4 text-earth-bark font-semibold">API Key</th>
                            <th className="text-left py-3 px-4 text-earth-bark font-semibold">Calls Today</th>
                            <th className="text-left py-3 px-4 text-earth-bark font-semibold">Quota Left</th>
                            <th className="text-left py-3 px-4 text-earth-bark font-semibold">Last Used</th>
                            <th className="text-left py-3 px-4 text-earth-bark font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-earth-tan/30">
                            <td className="py-4 px-4">
                                <div className="flex items-center space-x-2">
                                    <code className="text-sm font-mono text-earth-bark">
                                        {showKey ? user?.api_key : maskApiKey(user?.api_key)}
                                    </code>
                                    <button
                                        onClick={() => setShowKey(!showKey)}
                                        className="text-earth-forest hover:text-earth-brown text-sm underline"
                                    >
                                        {showKey ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <span className="font-semibold text-earth-bark">
                                    {quota?.used_today || 0}
                                </span>
                            </td>
                            <td className="py-4 px-4">
                                <span className="font-semibold text-earth-forest">
                                    {quota?.remaining || 0}
                                </span>
                            </td>
                            <td className="py-4 px-4 text-earth-bark/70">
                                {user?.last_used
                                    ? new Date(user.last_used).toLocaleString()
                                    : 'Never'}
                            </td>
                            <td className="py-4 px-4">
                                <button
                                    onClick={() => copyToClipboard(user?.api_key)}
                                    className="text-earth-forest hover:text-earth-brown font-semibold text-sm"
                                >
                                    Copy
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mt-6 p-4 bg-earth-beige rounded-lg">
                <h3 className="font-semibold text-earth-bark mb-2">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-earth-bark/60">Email:</span>
                        <span className="ml-2 text-earth-bark font-medium">{user?.email}</span>
                    </div>
                    <div>
                        <span className="text-earth-bark/60">Name:</span>
                        <span className="ml-2 text-earth-bark font-medium">{user?.name}</span>
                    </div>
                    <div>
                        <span className="text-earth-bark/60">Tier:</span>
                        <span className="ml-2 text-earth-bark font-medium capitalize">{user?.tier}</span>
                    </div>
                    <div>
                        <span className="text-earth-bark/60">Monthly Quota:</span>
                        <span className="ml-2 text-earth-bark font-medium">{quota?.limit || 1000}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
