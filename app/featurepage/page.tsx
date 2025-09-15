import Navbar from "@/components/navbar/page";
import Footer from "@/components/footer/page";

// Feature sections
import FeatureHero from "@/components/featurep/FeatureHero";
import FeatureInfoSection from "@/components/featurep/FeatureInfoSection";
import FeatureStaticDynamicSection from "@/components/featurep/FeatureStaticDynamicSection";
import { ProductSection } from "@/components/featurep/ProductSection";

// Extra sections
import FAQPage from "@/components/pages/faqpage/page";
import Info3 from "@/components/pages/info3/page";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content - scrollable */}
      <main className="w-full">
        <FeatureHero />
        <FeatureInfoSection />
        <FeatureStaticDynamicSection />
        <ProductSection />
        <FAQPage />
        <Info3 />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}