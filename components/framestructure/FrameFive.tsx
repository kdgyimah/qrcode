// FrameFive.tsx
import React from "react";

type FrameProps = {
  className?: string;
};

const FrameFive: React.FC<FrameProps> = ({ className }) => {
  return (
    <div className={`w-12 h-12 bg-purple-500 border-2 border-dotted border-white ${className}`}>
      {/* Frame 5 - Purple Dotted */}
    </div>
  );
};

export default FrameFive;