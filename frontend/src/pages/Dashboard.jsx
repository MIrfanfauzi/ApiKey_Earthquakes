import { useState, useEffect } from 'react'
import { useApiKey } from '../hooks/useApiKey'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import ApiKeysTable from '../components/Dashboard/ApiKeysTable'
import UsageCharts from '../components/Dashboard/UsageCharts'
import EarthquakeMap from '../components/Dashboard/EarthquakeMap'

export default function Dashboard() {
    const { apiKey, hasApiKey } = useApiKey()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!hasApiKey) {
            // Redirect to home if no API key
            navigate('/')
            return
        }

        fetchDashboardData()
    }, [hasApiKey, navigate])

    const fetchDashboardData = async () => {
        try {
            setLoading(true)
            const response = await api.get('/api/dashboard/usage')
            setDashboardData(response.data)
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load dashboard data')
        } finally {
            setLoading(false)
        }
    }

    if (!hasApiKey) {
        return null
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-earth-beige">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-earth-forest mx-auto mb-4"></div>
                    <p className="text-earth-bark font-semibold">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-earth-beige">
                <div className="card p-8 max-w-md">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                    <p className="text-earth-bark mb-4">{error}</p>
                    <button
                        onClick={fetchDashboardData}
                        className="btn-primary w-full"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-earth-beige">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-earth-bark mb-2">
                        Dashboard
                    </h1>
                    <p className="text-earth-bark/70">
                        Welcome back, {dashboardData?.user?.name || 'User'}
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="card p-6">
                        <div className="text-sm text-earth-bark/60 mb-1">Tier</div>
                        <div className="text-2xl font-bold text-gradient capitalize">
                            {dashboardData?.user?.tier || 'Free'}
                        </div>
                    </div>
                    <div className="card p-6">
                        <div className="text-sm text-earth-bark/60 mb-1">Calls Today</div>
                        <div className="text-2xl font-bold text-gradient">
                            {dashboardData?.quota?.used_today || 0}
                        </div>
                    </div>
                    <div className="card p-6">
                        <div className="text-sm text-earth-bark/60 mb-1">Remaining</div>
                        <div className="text-2xl font-bold text-gradient">
                            {dashboardData?.quota?.remaining || 0}
                        </div>
                    </div>
                    <div className="card p-6">
                        <div className="text-sm text-earth-bark/60 mb-1">Total Calls</div>
                        <div className="text-2xl font-bold text-gradient">
                            {dashboardData?.quota?.total_calls || 0}
                        </div>
                    </div>
                </div>

                {/* API Key Section */}
                <div className="mb-8">
                    <ApiKeysTable user={dashboardData?.user} quota={dashboardData?.quota} />
                </div>

                {/* Usage Charts */}
                <div className="mb-8">
                    <UsageCharts usageData={dashboardData?.usage_by_day || []} />
                </div>

                {/* Earthquake Map */}
                <div>
                    <EarthquakeMap />
                </div>
            </div>
        </div>
    )
}
