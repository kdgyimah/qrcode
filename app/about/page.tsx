import AboutHeroSection from '@/components/about/AboutHeroSection';
import WhatWeStandFor from '@/components/about/WhatWeStandForSection';
import Footer from '@/components/footer/page';
import Navbar from '@/components/navbar/page';
import BlogSection from '@/components/pages/blogp/page';
import FAQPage from '@/components/pages/faqpage/page';

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      {/* Hero Section */}
      <AboutHeroSection />
      <WhatWeStandFor />
      {/* Other sections to follow */}
      <FAQPage />
      <BlogSection />
      <Footer />
    </main>
  );
}
