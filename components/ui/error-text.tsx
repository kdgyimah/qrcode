import React from "react";

interface ErrorTextProps {
  children: string;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ children }) => (
  <p className="text-xs text-red-600 mt-1">{children}</p>
);