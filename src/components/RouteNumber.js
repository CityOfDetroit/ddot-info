import React from "react";

const RouteNumber = ({ number, color, textColor='#5f6369', size="base" }) => {

  let widths = {
    "base": '2.25rem',
    "small": '1.45rem'
  }

  let fontSizes = {
    "base": "1.25rem",
    "small": "0.8rem"
  }

  let borderSizes = {
    "base": "3px",
    "small": "2px"
  }

  let numberStyle = {
    background: color[0] !== '#' ? `#${color}` : color,
    width: widths[size],
    fontSize: fontSizes[size],
    border: number > 90 ? `${borderSizes[size]} solid #5f6369` : `${borderSizes[size]} solid ${'#' + color}`
  };

  let round = number < 11;

  textColor = number > 90 ? '#5f6369' : '#fff'

  return (
    <div 
      className={
        round
          ? "opacity-100 flex justify-center mr-2 no-underline rounded-full" 
          : "opacity-100 flex justify-center mr-2 no-underline"
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
