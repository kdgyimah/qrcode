// FrameOne.tsx
import React from "react";

interface FrameProps {
  className?: string;
}

const FrameOne: React.FC<FrameProps> = ({ className }) => {
  return (
    <div className={`w-12 h-12 bg-blue-500 rounded-lg border-2 border-white shadow-md ${className}`}>
      {/* Frame 1 - Blue Rounded */}
    </div>
  );
};

export default FrameOne;