'use client';

import Image from 'next/image';
import React from 'react';
import { FaBullseye, FaHandshake, FaLightbulb } from 'react-icons/fa'; // Example icons

interface CardItem {
  icon: JSX.Element;
  title: string;
  description: string;
}

const cardData: CardItem[] = [
  {
    icon: <Image src={'/icons/missionicon.svg'} alt="Arrow" width={50} height={50} className="text-blue-600 text-3xl mb-4" />,
    title: 'Mission',
    description: 'Our mission is to make QR code generation fast, reliable, and accessible to everyone.',
  },
  {
    icon: <Image src={'/icons/visionicon.svg'} alt="Light Bulb" width={50} height={50} className="text-blue-600 text-3xl mb-4" />,
    title: 'Values',
    description: 'We believe in transparency, trust, and user-first design at every step.',
  },
  {
    icon: <Image src={'/icons/valueicon.svg'} alt="Balance" width={50} height={50} className="text-blue-600 text-3xl mb-4" />,
    title: 'Innovation',
    description: 'We are constantly evolving to bring you cutting-edge QR technology.',
  },
];

const WhatWeStandFor: React.FC = () => {
  return (
    <section className="bg-white px-6 md:px-16 py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-black mb-12">What we stand for</h1>

      <div className="grid grid-cols-1 px-18 md:grid-cols-3 gap-8">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-xl p-8 shadow-sm flex flex-col items-center text-center"
          >
            {card.icon}
            <h2 className="text-2xl font-bold text-black mb-2">{card.title}</h2>
            <p className="text-gray-700 text-base">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeStandFor;
