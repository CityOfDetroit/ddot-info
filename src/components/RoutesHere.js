import React from "react";
import RouteNumber from './RouteNumber';

// Filter bar: pick one route (or all) to filter the departures list and stop map.
export const RoutesHere = ({ routes, currentRoute, setCurrentRoute }) => {

  if (routes.length < 2) { return null }

  let chipStyle = "flex items-center p-1 mr-2 rounded border-b-4"
  let activeStyle = chipStyle + " border-city-green bg-white"
  let inactiveStyle = chipStyle + " border-transparent"

  return (
    <div className="flex flex-wrap items-center px-4 py-2 bg-gray-100 border-b-2">
      <span className="text-sm mr-3">Show:</span>
      <button
        className={(!currentRoute ? activeStyle : inactiveStyle) + " text-sm"}
        aria-pressed={!currentRoute}
        onClick={() => setCurrentRoute(null)}
      >
        All routes
      </button>
      {routes.map(r => (
        <button
          key={r.short}
          className={currentRoute === r.short ? activeStyle : inactiveStyle}
          aria-pressed={currentRoute === r.short}
          aria-label={`${r.long}`}
          onClick={() => setCurrentRoute(r.short)}
        >
          <RouteNumber number={r.short} color={r.color} size="small" active={!currentRoute || currentRoute === r.short} />
        </button>
      ))}
    </div>
  );
};
