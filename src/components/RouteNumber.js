import React from "react";

const RouteNumber = ({ number, color }) => {
  let numberStyle = {
    background: color[0] !== '#' ? `#${color}` : color,
    maxWidth: '2rem'
  };

  let round = number < 11;

  return (
    <div className={round ? "w-8 py-1 opacity-100 flex justify-center mr-2 no-underline rounded-full" : "w-8 py-1 opacity-100 flex justify-center mr-2 no-underline"} style={numberStyle}>
      <span className="text-white font-extrabold text-center gibson-bold no-underline">
        {number}
      </span>
    </div>
  );
};

export default RouteNumber;
