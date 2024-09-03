import React from "react";

interface ColoredDivProps {
  backgroundColor: string;
  width: string;
  height: string;
}

const ColoredDiv: React.FC<ColoredDivProps> = ({ backgroundColor, width, height }) => {
  return (
    <div
      style={{
        backgroundColor,
        width,
        height,
      }}
    />
  );
};

export default ColoredDiv;