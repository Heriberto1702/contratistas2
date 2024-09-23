import React from "react";

interface ColoredDivProps {
  backgroundColor: string;
  width: string;
  height: string;
  marginTop:string;
  marginBottom:string;

}

const ColoredDiv: React.FC<ColoredDivProps> = ({ backgroundColor, width, height ,marginTop ,marginBottom}) => {
  return (
    <div
      style={{
        backgroundColor,
        width,
        height,
        marginTop,
        marginBottom,
      }}
    />
  );
};

export default ColoredDiv;