import { Link } from 'react-router-dom'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-earth-bark text-earth-beige">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-earth-gradient rounded-lg flex items-center justify-center">
                                <span className="text-white text-xl font-bold">🌍</span>
                            </div>
                            <span className="text-xl font-bold">Earthquake Indonesia API</span>
                        </div>
                        <p className="text-earth-tan mb-4">
                            Real-time and historical earthquake data from BMKG with 99.9% uptime.
                            Production-ready API for developers, researchers, and organizations.
                        </p>
                        <p className="text-sm text-earth-tan">
                            Data Source: BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-earth-tan hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/docs" className="text-earth-tan hover:text-white transition-colors">
                                    API Documentation
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="text-earth-tan hover:text-white transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <a href="#pricing" className="text-earth-tan hover:text-white transition-colors">
                                    Pricing
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="http://localhost:5000/api-docs" target="_blank" rel="noopener noreferrer" className="text-earth-tan hover:text-white transition-colors">
                                    Swagger Docs
                                </a>
                            </li>
                            <li>
                                <a href="https://www.bmkg.go.id" target="_blank" rel="noopener noreferrer" className="text-earth-tan hover:text-white transition-colors">
                                    BMKG Official
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-earth-tan hover:text-white transition-colors">
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-earth-brown mt-8 pt-8 text-center text-earth-tan text-sm">
                    <p>&copy; {currentYear} Earthquake Indonesia API. Built for educational purposes.</p>
                    <p className="mt-2">Made with 🌿 using Node.js, React, and TailwindCSS</p>
                </div>
            </div>
        </footer>
    )
}
