import { CheckCircle, XCircle } from 'lucide-react';

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
};

export default function PricingCard({
  title,
  subtitle,
  price,
  features,
  additional,
}: PricingCardProps) {
  return (
    <div className="bg-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="bg-gray-200 p-2 rounded-full mr-3">
          <CheckCircle className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <h4 className="text-md text-gray-600 mb-2">{subtitle}</h4>
      <p className="text-xl font-semibold text-black mb-4">{price}</p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mb-6 transition">
        Get Started
      </button>
      <ul className="flex-1 mb-6 space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center text-sm">
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
      <h4 className="text-md font-semibold mb-1">Additional Features:</h4>
      <h4 className="text-sm text-gray-700">{additional}</h4>
    </div>
  );
}
