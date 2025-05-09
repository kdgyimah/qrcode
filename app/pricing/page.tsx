import Navbar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import PricingSection from "@/components/PricingSection";
import Info3 from "@/components/pages/info3/page";
import FAQPage from "@/components/pages/faqpage/page";
import PricingHeroSec from "@/components/PricingHeroSec";
import AddOnsSection from "@/components/AddOnsSection";

export default function PricingPage() {
  return (
    <>
      <Navbar />

      <PricingHeroSec />
      <PricingSection />
      <AddOnsSection />
      <FAQPage />
      <Info3 />
      <Footer />
    </>
  );
}
