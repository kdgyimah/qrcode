// This is a server component

import Footer from "@/components/footer/page";
import Hero from "@/components/pages/hero/page";
import Info1 from "@/components/pages/info1/page";
import Info2 from "@/components/pages/info2/page";
import Navbar from "@/components/navbar/page";
import Info3 from "@/components/pages/info3/page";
import FAQPage from "@/components/pages/faqpage/page";
import QRGeneratorSection from "@/components/pages/qrgenerationsection/page";
import BlogSection from "@/components/pages/blogp/page";
import TutorialSection1 from "@/components/pages/tutorialsec1/page";
import TutorialSection2 from "@/components/pages/tutorialsec2/page";
import TutorialSection3 from "@/components/pages/tutorialsec3/page";
import ExperienceSection from "@/components/ExperienceSection";
import QrInterface from "@/components/QrInterface";
import QuestionSupportSection from "@/components/QuestionSupportSection";


export default function Home() {
  return (
    <div className="pt-18 w-full" >
      <Navbar />
      <Hero />
      <QrInterface />
      <Info1 />
      <Info2 />
      <TutorialSection1 />
      <TutorialSection2 />
      <TutorialSection3 />
      <QRGeneratorSection />
      <FAQPage/>
      <QuestionSupportSection/>
      <BlogSection />
      <ExperienceSection />
      <Info3/>
      <Footer />
    </div>
  );
}
