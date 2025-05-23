'use client';

import { useState } from 'react';
import PricingCard from './PricingCard';
import ToggleSwitch from './ToggleSwitch';

const pricingData = {
  monthly: [
    {
      title: 'Basic',
      subtitle: 'For individuals',
      price: '$0 /month',
      features: [
        { text: '1 Project', available: true },
        { text: 'Email Support', available: true },
        { text: 'Analytics', available: false },
      ],
      additional: 'Access to community support',
    },
    {
      title: 'Pro',
      subtitle: 'For small teams',
      price: '$15 /month',
      features: [
        { text: '10 Projects', available: true },
        { text: 'Priority Support', available: true },
        { text: 'Advanced Analytics', available: false },
      ],
      additional: 'Team collaboration features included',
    },
    {
      title: 'Enterprise',
      subtitle: 'For large organizations',
      price: '$49 /month',
      features: [
        { text: 'Unlimited Projects', available: true },
        { text: '24/7 Support', available: true },
        { text: 'Custom Analytics', available: true },
      ],
      additional: 'Dedicated account manager',
    },
  ],
  yearly: [
    {
      title: 'Basic',
      subtitle: 'For individuals',
      price: '$0 /year',
      features: [
        { text: '1 Project', available: true },
        { text: 'Email Support', available: true },
        { text: 'Analytics', available: false },
      ],
      additional: 'Access to community support',
    },
    {
      title: 'Pro',
      subtitle: 'For small teams',
      price: '$120 /year',
      features: [
        { text: '10 Projects', available: true },
        { text: 'Priority Support', available: true },
        { text: 'Advanced Analytics', available: true },
      ],
      additional: 'Team collaboration features included',
    },
    {
      title: 'Enterprise',
      subtitle: 'For large organizations',
      price: '$420 /year',
      features: [
        { text: 'Unlimited Projects', available: true },
        { text: '24/7 Support', available: true },
        { text: 'Custom Analytics', available: true },
      ],
      additional: 'Dedicated account manager',
    },
  ],
};

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const plans = isYearly ? pricingData.yearly : pricingData.monthly;

  return (
    <section className="px-4 sm:px-6 md:px-12 py-16 bg-white text-gray-900">
      {/* Toggle */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-4">
          <span className="font-semibold text-lg">Monthly</span>
          <ToggleSwitch enabled={isYearly} setEnabled={setIsYearly} />
          <span className="font-semibold text-lg relative">
            Yearly
            <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white text-xs font-semibold px-2 rounded-full shadow-md">
              Save 65%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            subtitle={plan.subtitle}
            price={plan.price}
            features={plan.features}
            additional={plan.additional}
          />
        ))}
      </div>
    </section>
  );
}
