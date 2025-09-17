// ErrorText.tsx
import React from "react";

interface ErrorTextProps {
  children: React.ReactNode; 
  id:string ; 
}

export const ErrorText: React.FC<ErrorTextProps> = ({ children }) => {
  if (!children) return null; 
  return (
    <p className="mt-1 text-sm text-red-600">
      {children}
    </p>
  );
};
