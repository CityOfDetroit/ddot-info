import { Link } from 'gatsby';
import React from "react";
import RouteNumber from './RouteNumber';

export const RoutesHere = ({ routes, currentRoute, setCurrentRoute }) => {

  return (
    <div className="px-4 pt-2 pb-2">
      {routes.map(r => (
        <div key={r.short} className="flex items-center py-1">
          <label className="flex items-center">
            <input
              type="radio"
              className="form-radio mr-2"
              name="routes-here"
              value={r.short}
              onChange={() => setCurrentRoute(r.short)}
              checked={currentRoute === r.short} />
            <RouteNumber number={r.short} color={r.color} size="small" />
          </label>
          <Link aria-label={`${r.long} route page`} to={`/route/${r.short}`}>
            <span className="">{r.long}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};
