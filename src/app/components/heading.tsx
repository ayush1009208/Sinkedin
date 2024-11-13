import React from "react";

interface HeadingProps {
  text: string;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ text, className }) => {
  return (
    <h1
      className={`text-white text-left ml-[100px] ${className} font-bold text-[45px]`}
    >
      {text}
    </h1>
  );
};

export default Heading;
