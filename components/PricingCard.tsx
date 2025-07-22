import { CheckCircle, XCircle } from "lucide-react";
import { ReactNode } from "react";

type Feature = {
  text: string;
  available: boolean;
};

type PricingCardProps = {
  title: string;
  subtitle: string;
  price: string;
  features: Feature[];
  additional: string;
  icon: ReactNode;
  isPopular?: boolean;
};

export default function PricingCard({
  title,
  subtitle,
  price,
  features,
  additional,
  icon,
  isPopular,
}: PricingCardProps) {
  return (
    <div
      className={`relative bg-gray-100 border border-gray-200 rounded-2xl p-6 shadow-md transition-all duration-300 transform hover:scale-[1.03] hover:shadow-xl
      }`}
    >
      {isPopular && (
        <span className="absolute top-3 right-3 bg-black text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
        Popular
        </span>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <h4 className="text-sm text-gray-500 mb-2">{subtitle}</h4>
      <p className="text-xl font-semibold text-black mb-4">{price}</p>

      <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg font-medium mb-6 transition">
        Get Started
      </button>

      <ul className="space-y-2 mb-6 text-sm">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            {feature.available ? (
              <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
            ) : (
              <XCircle className="text-red-400 w-5 h-5 mr-2" />
            )}
            {feature.text}
          </li>
        ))}
      </ul>

      <hr className="border-t border-gray-200 mb-4" />
      <h4 className="text-sm font-semibold mb-1">Additional Features:</h4>
      <p className="text-sm text-gray-700">{additional}</p>
    </div>
  );
}
