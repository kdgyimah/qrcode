// This is a server component

import Footer from "@/components/footer/page";
import Hero from "@/components/pages/hero/page";
import Info1 from "@/components/pages/info1/page";
import Info2 from "@/components/pages/info2/page";
import Navbar from "@/components/navbar/page";
import Info3 from "@/components/pages/info3/page";
import FAQPage from "@/components/pages/faqpage/page";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Info1 />
      <FAQPage/>
      <Info2 />
      <Info3/>
      <Footer />
    </div>
  );
}
