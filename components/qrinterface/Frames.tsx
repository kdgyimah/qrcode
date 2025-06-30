'use client';

import { useState, ReactNode } from 'react';

import FrameOne from '@/components/framestructure/FrameOne';
import FrameTwo from '../framestructure/FrameTwo';
import FrameThree from '../framestructure/FrameThree';
import FrameFour from '../framestructure/FrameFour';
import Framefive from '../framestructure/FrameFive';
import FrameSix from '../framestructure/FrameSix';

interface FramesProps {
  // onsetFrame: (icon: ReactNode) => void;
   onsetFrame: (frameUrl: string) => void;
}

interface FrameItem {
  icon: ReactNode;
  label?: string;
  frameUrl: string;
}

export default function Frames({ onsetFrame }: FramesProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const items: FrameItem[] = [
    { icon: <FrameOne className="icons" />, label: 'Link', frameUrl: 'frame-one' },
    { icon: <FrameTwo className="icons" />, label: 'Call', frameUrl: 'frame-two' },
    { icon: <FrameThree className="icons" />, frameUrl: 'frame-three' },
    { icon: <FrameFour className="icons" />, frameUrl: 'frame-four' },
    { icon: <Framefive className="icons" />, frameUrl: 'frame-five' },
    { icon: <FrameSix className="icons" />, frameUrl: 'frame-six' },
  ];
  const handleFrameClick = (item: FrameItem, index: number) => {
    setActiveIndex(index);
    onsetFrame(item.frameUrl); // Pass the frame URL to the parent component
    console.log('Selected frame:', item.frameUrl);
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
