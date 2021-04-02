import React from "react";
import RouteListItem from './RouteListItem';
import SiteSection from "./SiteSection";

const RoutesList = ({ routes, scroll=true }) => {
  return (
    <SiteSection title="All bus routes" scroll={scroll} fullWidth>
      {
        routes.map(r => (<RouteListItem route={r} key={r.short} />))
      }
    </SiteSection>
  );
};

export default RoutesList;
