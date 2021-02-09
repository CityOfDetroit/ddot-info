import React from "react";

const RouteNumber = ({ number, color, textColor='#5f6369' }) => {
  let numberStyle = {
    background: color[0] !== '#' ? `#${color}` : color,
    width: '2.35rem',
    border: number > 90 ? "2px solid #5f6369" : "none"
  };

  let round = number < 11;

  textColor = number > 90 ? '#5f6369' : '#fff'

  return (
    <div 
      className={
        round 
          ? "text-xl py-1 opacity-100 flex justify-center mr-2 no-underline rounded-full" 
          : "w-10 py-1 opacity-100 flex justify-center mr-2 no-underline"
        } 
        style={numberStyle}
    >
      <span className="font-extrabold text-center gibson-bold no-underline" style={{color: textColor}}>
        {number}
      </span>
    </div>
  );
};

export default RouteNumber;
