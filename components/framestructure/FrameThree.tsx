// FrameThree.tsx
import React from "react";

type FrameProps = {
  className?: string;
};

const FrameThree: React.FC<FrameProps> = ({ className }) => {
  return (
    <div className={`w-12 h-12 bg-red-500 border-4 border-dashed border-white ${className}`}>
      {/* Frame 3 - Red Dashed */}
    </div>
  );
};

export default FrameThree;