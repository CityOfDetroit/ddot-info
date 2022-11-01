import { Link } from 'gatsby';
import React from "react";
import RouteNumber from './RouteNumber';

export const RoutesHere = ({ routes, currentRoute, setCurrentRoute }) => {

  return (
    <div className="px-4 pt-2 pb-2">
      {routes.map(r => (
        <div key={r.short} onClick={() => setCurrentRoute(r.short)} onKeyDown={() => setCurrentRoute(r.short)} role="button" tabIndex={0}>
          <label className="inline-block flex items-center py-1">
            <input
              type="radio"
              className="form-radio mr-2"
              id={r.short}
              name={r.long}
              value={r.short}
              readOnly
              checked={currentRoute === r.short} />
            <RouteNumber number={r.short} color={r.color} size="small" />
            <Link aria-label={`${r.long} route page`} to={`/route/${r.short}`}>
              <span className="">{r.long}</span>
            </Link>
          </label>
        </div>
      ))}
    </div>
  );
};
