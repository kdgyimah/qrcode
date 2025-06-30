// FrameTwo.tsx
import React from "react";

const FrameTwo: React.FC<FrameProps> = ({ className }) => {
  return (
    <div className={`w-12 h-12 bg-green-500 rounded-full border-2 border-white shadow-md ${className}`}>
      {/* Frame 2 - Green Circle */}
    </div>
  );
};

export default FrameTwo;