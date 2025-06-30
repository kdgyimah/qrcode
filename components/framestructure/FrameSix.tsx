// FrameSix.tsx
import React from "react";

type FrameProps = {
  className?: string;
};

const FrameSix: React.FC<FrameProps> = ({ className }) => {
  return (
    <div className={`w-12 h-12 bg-gray-600 border-4 border-blue-300 rounded-xl ${className}`}>
      {/* Frame 6 - Gray Rounded XL */}
    </div>
  );
};

export default FrameSix;