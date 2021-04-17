import React from "react";
import RouteListItem from './RouteListItem';
import SiteSection from "./SiteSection";

const RoutesList = ({ routes, scroll=true, title="List of routes" }) => {
  return (
    <SiteSection scroll={scroll} title={title} fullWidth>
      {
        routes.map(r => (<RouteListItem route={r} key={r.short} />))
      }
    </SiteSection>
  );
};

export default RoutesList;
