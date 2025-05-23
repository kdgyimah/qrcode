import Navbar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import PricingSection from "@/components/PricingSection";
import Info3 from "@/components/pages/info3/page";
import FAQPage from "@/components/pages/faqpage/page";
import PricingHeroSec from "@/components/PricingHeroSec";
import AddOnsSection from "@/components/AddOnsSection";

export default function PricingPage() {
  return (
    <div className="pt-16 md:pt-18 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PricingHeroSec />
        <PricingSection />
        <AddOnsSection />
        <FAQPage />
        <Info3 />
      </main>
      
      <Footer />
    </div>
  );
}
