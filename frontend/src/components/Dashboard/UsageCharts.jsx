import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartBarIcon } from '@heroicons/react/24/outline'

export default function UsageCharts({ usageData }) {
    // Transform data for recharts
    const chartData = usageData.map(item => ({
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        calls: parseInt(item.calls)
    }))

    return (
        <div className="card p-6">
            <div className="flex items-center mb-6">
                <ChartBarIcon className="w-6 h-6 mr-2 text-earth-forest" />
                <h2 className="text-2xl font-bold text-earth-bark">Usage Analytics</h2>
            </div>

            {chartData.length === 0 ? (
                <div className="text-center py-12 text-earth-bark/60">
                    <p>No usage data available yet. Start making API calls to see your analytics!</p>
                </div>
            ) : (
                <div>
                    <h3 className="text-lg font-semibold text-earth-bark mb-4">API Calls (Last 30 Days)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#D2B48C" />
                            <XAxis
                                dataKey="date"
                                stroke="#3E2723"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis
                                stroke="#3E2723"
                                style={{ fontSize: '12px' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#F5F5DC',
                                    border: '2px solid #2D5016',
                                    borderRadius: '8px'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="calls"
                                stroke="#2D5016"
                                strokeWidth={3}
                                dot={{ fill: '#8B4513', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-earth-beige p-4 rounded-lg">
                            <div className="text-sm text-earth-bark/60 mb-1">Total Calls (30 days)</div>
                            <div className="text-2xl font-bold text-earth-forest">
                                {chartData.reduce((sum, item) => sum + item.calls, 0)}
                            </div>
                        </div>
                        <div className="bg-earth-beige p-4 rounded-lg">
                            <div className="text-sm text-earth-bark/60 mb-1">Average per Day</div>
                            <div className="text-2xl font-bold text-earth-forest">
                                {Math.round(chartData.reduce((sum, item) => sum + item.calls, 0) / chartData.length)}
                            </div>
                        </div>
                        <div className="bg-earth-beige p-4 rounded-lg">
                            <div className="text-sm text-earth-bark/60 mb-1">Peak Day</div>
                            <div className="text-2xl font-bold text-earth-forest">
                                {Math.max(...chartData.map(item => item.calls))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
