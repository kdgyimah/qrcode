import FeatureHero from '@/components/featurep/FeatureHero';
import FeatureInfoSection from '@/components/featurep/FeatureInfoSection';
import FeatureStaticDynamicSection from '@/components/featurep/FeatureStaticDynamicSection';
import { ProductSection } from '@/components/featurep/ProductSection';
import Footer from '@/components/footer/page';
import Navbar from '@/components/navbar/page';
import FAQPage from '@/components/pages/faqpage/page';
import Info3 from '@/components/pages/info3/page';

export default function AboutPage() {
  return (
    <main className="pt-16 bg-white min-h-screen">
      <Navbar />

      <div className="flex flex-col w-full overflow-hidden">
        {/* Feature Hero Section */}
        <FeatureHero />

        {/* Feature Info Section */}
        <FeatureInfoSection />

        {/* Static vs Dynamic QR Feature Section */}
        <FeatureStaticDynamicSection />
        
        {/* Product Section */}
        <ProductSection />
        
        {/* FAQs */}
        <FAQPage />

        {/* Blog Section */}
        <Info3 />
      </div>

      <Footer />
    </main>
  );
}