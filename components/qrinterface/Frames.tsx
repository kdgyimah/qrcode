'use client';

import { useState, ReactNode } from 'react';

import FrameOne from '../FrameStructure/FrameOne';
import FrameTwo from '../FrameStructure/FrameTwo';
import FrameThree from '../FrameStructure/FrameThree';
import FrameFour from '../FrameStructure/FrameFour';
import Framefive from '../FrameStructure/Framefive';
import FrameSix from '../FrameStructure/FrameSix';
import FrameSeven from '../FrameStructure/FrameSeven';
import FrameEight from '../FrameStructure/FrameEight';
import FrameNine from '../FrameStructure/FrameNine';

interface FramesProps {
  // onsetFrame: (icon: ReactNode) => void;
   onsetFrame: (frameUrl: string) => void;
}

interface FrameItem {
  icon: ReactNode;
  label?: string;
}

export default function Frames({ onsetFrame }: FramesProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items: FrameItem[] = [
    { icon: <FrameOne className="icons" />, label: 'Link' },
    { icon: <FrameTwo className="icons" />, label: 'Call' },
    { icon: <FrameThree className="icons" /> },
    { icon: <FrameFour className="icons" /> },
    { icon: <Framefive className="icons" /> },
    { icon: <FrameSix className="icons" /> },
    { icon: <FrameSeven className="icons" /> },
    { icon: <FrameEight className="icons" /> },
    { icon: <FrameNine className="icons" /> },
  ];

  const handleFrameClick = (item: FrameItem, index: number) => {
    setActiveIndex(index);
    onsetFrame(item.icon);
    console.log(`Selected frame with index: ${index}`);
  };

  return (
    <div className="bg-white p-2 shadow-lg rounded-md">
      <div className="flex overflow-x-auto gap-4 snap-x scroll-smooth py-2">
        {items.map((item, index) => (
          <div
            key={index}
            className={`min-w-[60px] h-[60px] flex items-center justify-center rounded-lg border cursor-pointer snap-center ${
              activeIndex === index
                ? 'border-blue-500 ring-2 ring-blue-300'
                : 'border-gray-300'
            }`}
            onClick={() => handleFrameClick(item, index)}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
}
