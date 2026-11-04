import React from "react";

interface CircleMaskTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const CircleMaskTransition: React.FC<CircleMaskTransitionProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default CircleMaskTransition;
