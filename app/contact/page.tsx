import ContactHeader from "@/components/ContactHeader";
import ContactForm from "@/components/ContactForm";
import ContactMap from "@/components/ContactMap";
import Navbar from "@/components/navbar/page";
import Footer from "@/components/footer/page";

export default function ContactPage() {
  return (
    <div className="pt-18">
      <Navbar />
      <ContactHeader />

      {/* Responsive section */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-8 mt-12 px-4 max-w-7xl mx-auto">
        <div className="w-full md:w-1/2">
          <div className="h-[400px] md:h-[650px]">
            <ContactMap />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="h-auto md:h-[650px]">
            <ContactForm/>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}