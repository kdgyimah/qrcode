import Navbar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import FeatureHero from "@/components/featurep/FeatureHero";
import FeatureInfoSection from "@/components/featurep/FeatureInfoSection";
import FeatureStatistics from "@/components/featurep/FeatureStaticDynamicSection";import { ProductSection } from "@/components/featurep/ProductSection";

export default function FeaturePage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-16 bg-gray-50">
        <FeatureHero />
        <FeatureInfoSection />
        <FeatureStatistics />
        <ProductSection />
      </main>
      <Footer />
    </>
  );
}
