import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { MapIcon } from '@heroicons/react/24/outline'
import api from '../../services/api'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom red marker for earthquakes
const createCustomIcon = (magnitude) => {
    const size = Math.min(15 + magnitude * 3, 40)
    return L.divIcon({
        className: 'custom-earthquake-marker',
        html: `<div style="
      background-color: #dc2626;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: ${Math.max(10, size / 3)}px;
    ">${magnitude.toFixed(1)}</div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
    })
}

function MapUpdater({ earthquakes }) {
    const map = useMap()

    useEffect(() => {
        if (earthquakes.length > 0) {
            const bounds = earthquakes.map(eq => [eq.latitude, eq.longitude])
            map.fitBounds(bounds, { padding: [50, 50] })
        }
    }, [earthquakes, map])

    return null
}

export default function EarthquakeMap() {
    const [earthquakes, setEarthquakes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchRecentEarthquakes()
    }, [])

    const fetchRecentEarthquakes = async () => {
        try {
            setLoading(true)
            const response = await api.get('/api/dashboard/recent-earthquakes')
            setEarthquakes(response.data.data || [])
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load earthquake data')
        } finally {
            setLoading(false)
        }
    }

    // Default center (Indonesia)
    const defaultCenter = [-2.5, 118.0]
    const defaultZoom = 5

    return (
        <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <MapIcon className="w-6 h-6 mr-2 text-earth-forest" />
                    <h2 className="text-2xl font-bold text-earth-bark">Recent Strong Earthquakes</h2>
                </div>
                <button
                    onClick={fetchRecentEarthquakes}
                    disabled={loading}
                    className="text-earth-forest hover:text-earth-brown font-semibold text-sm"
                >
                    {loading ? 'Loading...' : 'Refresh'}
                </button>
            </div>

            <p className="text-earth-bark/70 mb-4">
                Showing earthquakes with magnitude ≥ 4.0 from the last 7 days
            </p>

            {error && (
                <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 mb-4">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            <div className="h-96 rounded-lg overflow-hidden shadow-earth">
                {loading ? (
                    <div className="h-full flex items-center justify-center bg-earth-beige">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-earth-forest mx-auto mb-4"></div>
                            <p className="text-earth-bark">Loading map...</p>
                        </div>
                    </div>
                ) : earthquakes.length === 0 ? (
                    <div className="h-full flex items-center justify-center bg-earth-beige">
                        <p className="text-earth-bark/60">No recent strong earthquakes found</p>
                    </div>
                ) : (
                    <MapContainer
                        center={defaultCenter}
                        zoom={defaultZoom}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapUpdater earthquakes={earthquakes} />
                        {earthquakes.map((earthquake) => (
                            <Marker
                                key={earthquake.id}
                                position={[earthquake.latitude, earthquake.longitude]}
                                icon={createCustomIcon(earthquake.magnitudo)}
                            >
                                <Popup>
                                    <div className="p-2">
                                        <h3 className="font-bold text-earth-bark mb-2">
                                            Magnitude {earthquake.magnitudo}
                                        </h3>
                                        <p className="text-sm text-earth-bark/70 mb-1">
                                            <strong>Location:</strong> {earthquake.wilayah}
                                        </p>
                                        <p className="text-sm text-earth-bark/70 mb-1">
                                            <strong>Date:</strong> {new Date(earthquake.tgl).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm text-earth-bark/70">
                                            <strong>Depth:</strong> {earthquake.kedalaman_km} km
                                        </p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                )}
            </div>

            {earthquakes.length > 0 && (
                <div className="mt-4 text-sm text-earth-bark/60">
                    Showing {earthquakes.length} earthquake{earthquakes.length !== 1 ? 's' : ''} on the map
                </div>
            )}
        </div>
    )
}
