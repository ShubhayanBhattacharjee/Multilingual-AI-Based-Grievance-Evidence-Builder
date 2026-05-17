import HeroSection from "./HeroSection"
import FeaturesSection from "./FeaturesSection"
import HowItWorks from "./HowItWorks"
import StatsSection from "./StatsSection"
import CTASection from "./CTASection"
import Footer from "../../components/common/Footer"

function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <StatsSection />
      <CTASection />
      <Footer />
    </>
  )
}

export default Home