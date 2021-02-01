import { faRoute } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {Link} from 'gatsby';
import SectionHeader from './SectionHeader';
import SectionContainer from './SectionContainer'
import RouteNumber from './RouteNumber';

export const RoutesHere = ({ routes, currentRoute, setCurrentRoute }) => {

  return (
    <SectionContainer header={<SectionHeader icon={faRoute} title={`Routes that stop here`} />}>
      <div className="p-2">
        {routes.map(r => (
          <label key={r.short} className="inline-block flex items-center py-1" onClick={() => setCurrentRoute(r.short)}>
            <input
              type="radio"
              className="form-radio mr-2"
              id={r.short}
              name={r.long}
              value={r.short}
              readOnly
              checked={currentRoute === r.short} />
            <RouteNumber number={r.short} color={r.color} />
            <Link to={`/route/${r.short}`}>
              <span className="">{r.long}</span>
            </Link>
          </label>
        ))}
      </div>
    </SectionContainer>
  );
};
