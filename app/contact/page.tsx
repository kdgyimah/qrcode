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

      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 mt-12 px-4">
        <div className="w-full md:w-1/2 h-[650px]">
          <ContactMap />
        </div>
        <div className="w-full md:w-1/2 h-[650px]">
          <ContactForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
