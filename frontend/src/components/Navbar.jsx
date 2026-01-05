import { Link } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <nav className="bg-white shadow-earth sticky top-0 z-50 backdrop-blur-earth">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-earth-gradient rounded-lg flex items-center justify-center">
                            <span className="text-white text-xl font-bold">🌍</span>
                        </div>
                        <span className="text-xl font-bold text-gradient">API Gempa Indonesia</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-earth-bark hover:text-earth-forest font-medium transition-colors">
                            Beranda
                        </Link>
                        <Link to="/docs" className="text-earth-bark hover:text-earth-forest font-medium transition-colors">
                            Dokumentasi API
                        </Link>
                        <Link to="/dashboard" className="text-earth-bark hover:text-earth-forest font-medium transition-colors">
                            Dasboard
                        </Link>
                        <a
                            href="#get-started"
                            className="btn-primary"
                        >
                            Dapatkan API Key
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-earth-bark hover:text-earth-forest"
                        >
                            {mobileMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-earth-tan">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-md text-earth-bark hover:bg-earth-beige font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Beranda
                        </Link>
                        <Link
                            to="/docs"
                            className="block px-3 py-2 rounded-md text-earth-bark hover:bg-earth-beige font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Dokumentasi API
                        </Link>
                        <Link
                            to="/dashboard"
                            className="block px-3 py-2 rounded-md text-earth-bark hover:bg-earth-beige font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Dasboard
                        </Link>
                        <a
                            href="#get-started"
                            className="block px-3 py-2 rounded-md bg-earth-gradient text-white font-semibold text-center"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Get API Key
                        </a>
                    </div>
                </div>
            )}
        </nav>
    )
}
