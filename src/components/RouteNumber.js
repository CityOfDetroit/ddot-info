import React from "react";
import { keyboardActivate } from './keyboardActivate';

const RouteNumber = ({ number, color, size="base", active=true, onClick }) => {

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

  // pick black or white text based on the route color's luminance
  let hex = color[0] === '#' ? color.slice(1) : color
  let luminance = (
    0.299 * parseInt(hex.slice(0, 2), 16) +
    0.587 * parseInt(hex.slice(2, 4), 16) +
    0.114 * parseInt(hex.slice(4, 6), 16)
  ) / 255
  let textColor = luminance > 0.6 ? '#1a202c' : '#fff'

  return (
    <div 
      className={
        round
          ? "opacity-100 flex justify-center mr-2 no-underline rounded-full" 
          : "opacity-100 flex justify-center mr-2 no-underline"
        } 
        style={numberStyle}
        onClick={onClick}
        onKeyDown={onClick ? keyboardActivate(onClick) : null}
        role={onClick ? "button" : null}
        tabIndex={onClick ? 0 : null}
    >
      <span className="text-center gibson-bold no-underline" style={{color: textColor}}>
        {number}
      </span>
    </div>
  );
};

export default RouteNumber;
