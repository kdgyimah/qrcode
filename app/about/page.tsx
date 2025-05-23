import AboutHeroSection from '@/components/about/AboutHeroSection';
import AboutThirdSection from '@/components/about/AboutThirdSection';
import WhatWeStandFor from '@/components/about/WhatWeStandForSection';
import Footer from '@/components/footer/page';
import Navbar from '@/components/navbar/page';
import BlogSection from '@/components/pages/blogp/page';
import FAQPage from '@/components/pages/faqpage/page';

export default function AboutPage() {
  return (
    <main className="pt-18">
      <Navbar />

      <div className="flex flex-col space-y-12 overflow-hidden">
        {/* Hero Section */}
        <AboutHeroSection />

        {/* Our Values */}
        <WhatWeStandFor />

        {/* Additional Info */}
        <AboutThirdSection />

        {/* FAQs */}
        <FAQPage />

        {/* Blog Section */}
        <BlogSection />
      </div>

      <Footer />
    </main>
  );
}
