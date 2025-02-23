import React from "react";
import beeSvg from "./bee.svg";

const CuteBee = ({ className = "", size = 150, disableFloat = false }) => {
  return (
    <img 
      src={beeSvg}
      width={size}
      height={size}
      className={`${className} ${!disableFloat ? 'animate-float' : ''}`}
      alt="Cute Bee"
      style={{ 
        width: size,
        height: size,
        objectFit: "contain",
        animation: !disableFloat ? "float 6s ease-in-out infinite" : "none",
        transform: "translateZ(0)",
        willChange: "transform"
      }}
    />
  );
};

// Add keyframes animation to the component's styles
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    25% {
      transform: translateY(-10px) rotate(2deg);
    }
    50% {
      transform: translateY(0px) rotate(0deg);
    }
    75% {
      transform: translateY(10px) rotate(-2deg);
    }
    100% {
      transform: translateY(0px) rotate(0deg);
    }
  }
`;
document.head.appendChild(style);

export default CuteBee;
