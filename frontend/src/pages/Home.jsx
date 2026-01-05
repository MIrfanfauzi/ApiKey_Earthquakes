import LandingHero from '../components/LandingHero'
import FeaturesSection from '../components/FeaturesSection'
import PricingTiers from '../components/PricingTiers'
import ApiKeyGenerator from '../components/ApiKeyGenerator'

export default function Home() {
    return (
        <div>
            <LandingHero />
            <FeaturesSection />
            <PricingTiers />
            <ApiKeyGenerator />
        </div>
    )
}
