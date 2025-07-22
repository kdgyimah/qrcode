// FrameFour.tsx
import React from "react";

type FrameProps = {
  className?: string;
};

const FrameFour: React.FC<FrameProps> = ({ className }) => {
  return (
    <div className={`w-12 h-12 bg-yellow-400 border-4 border-black transform rotate-6 ${className}`}>
      {/* Frame 4 - Yellow Tilted */}
    </div>
  );
};

export default FrameFour;