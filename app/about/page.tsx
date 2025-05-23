import AboutHeroSection from '@/components/about/AboutHeroSection';
import AboutThirdSection from '@/components/about/AboutThirdSection';
import WhatWeStandFor from '@/components/about/WhatWeStandForSection';
import Footer from '@/components/footer/page';
import Navbar from '@/components/navbar/page';
import BlogSection from '@/components/pages/blogp/page';
import FAQPage from '@/components/pages/faqpage/page';

export default function AboutPage() {
  return (
    <main className='pt-18'>
      <Navbar />
      {/* Hero Section */}
      <AboutHeroSection />
      <WhatWeStandFor />
      <AboutThirdSection />
      {/* Other sections to follow */}
      <FAQPage />
      <BlogSection />
      <Footer />
    </main>
  );
}
