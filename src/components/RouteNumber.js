import React from "react";

const RouteNumber = ({ number, color, textColor='#5f6369', size="base", active=true, onClick }) => {

  let widths = {
    "base": '2.25rem',
    "small": '1.4rem'
  }

  let fontSizes = {
    "base": "1.25rem",
    "small": "0.8rem"
  }

  let borderSizes = {
    "base": "3px",
    "small": "2px"
  }

  let fontWeights = {
    small: 500,
    base: 700
  }

  let numberStyle = {
    background: color[0] !== '#' ? `#${color}` : color,
    width: widths[size],
    fontSize: fontSizes[size],
    fontWeight: fontWeights[size],
    opacity: active ? 1 : 0.5,
    border: ["46", "80", "89", "92", "95", "96"].indexOf(number) > -1 ? `${borderSizes[size]} solid #5f6369` : `${borderSizes[size]} solid ${'#' + color}`
  };

  let round = number < 11;

  textColor = ["46", "80", "89", "92", "95", "96"].indexOf(number) > -1 ? '#5f6369' : '#fff'

  return (
    <div 
      className={
        round
          ? "opacity-100 flex justify-center mr-2 no-underline rounded-full" 
          : "opacity-100 flex justify-center mr-2 no-underline"
        } 
        style={numberStyle}
        onClick={onClick}
        onKeyDown={onClick}
        role="button"
        tabIndex={0}
    >
      <span className="text-center gibson-bold no-underline" style={{color: textColor}}>
        {number}
      </span>
    </div>
  );
};

export default RouteNumber;
