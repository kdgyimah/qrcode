// components/AddOnsSection.tsx
import Image from "next/image";

const addOns = [
    {
      id: 1,
      icon: "/icons/icon1.svg",
      title: "One-time high-res downloads",
      description: "Get QR codes in SVG, PDF or EPS formats, $1 per file",
      linkText: "Purchase Now",
    },
    {
      id: 2,
      icon: "/icons/icon2.svg",
      title: "API Access(Pay-as-you-go)",
      description: "Integrate QR codes into your app or site-$0.005/request",
      linkText: "Get API Access",
    },
    {
      id: 3,
      icon: "/icons/icon3.svg",
      title: "Custom QR Code Design Service",
      description: "Get a custom QR code designed by experts-$100+",
      linkText: "Request a Design",
    },
    {
      id: 4,
      icon: "/icons/icon4.svg",
      title: "QR Code Printing and Merchandise",
      description: "Order printed QR stickers, posters & cards-$10+",
      linkText: "Learn more",
    },
  ];

export default function AddOnsSection() {
  return (
    <section
      className="relative py-16 px-6 text-white"
      style={{ backgroundColor: "rgba(16, 10, 85, 1)" }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/enter.jpg" // Make sure you have this image
          alt="Add-Ons Background"
          fill
          className="object-cover"
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-50" /> */}
      </div>

      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Additional Add-Ons
      </h2>

      {/* Cards */}
      <div className="grid px-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {addOns.map((item) => (
          <div
            key={item.id}
            style={{ backgroundColor: "rgba(25, 16, 127, 0.6)" }}
            className="p-6 rounded-xl shadow-md flex flex-col gap-4 text-white"
          >
            {/* Logo Icon */}
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <Image
                src={item.icon}
                alt={item.title}
                width={40}
                height={40}
              />
            </div>

            {/* Text Content */}
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="opacity-90">{item.description}</p>
            <a
              href="#"
              className="mt-auto font-bold flex items-center hover:underline"
            >
              {item.linkText} <span className="ml-2">&gt;</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
