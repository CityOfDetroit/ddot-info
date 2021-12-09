import React from "react";
import RouteListItem from './RouteListItem';
import SiteSection from "./SiteSection";

const RoutesList = ({ routes, scroll=true, title="List of routes" }) => {

  routes = routes.filter(r => r.type === 3)
  
  return (
    <SiteSection scroll={scroll} title={title} fullWidth>
      {
        routes.map(r => (<RouteListItem route={r} key={r.short} />))
      }
    </SiteSection>
  );
};

export default RoutesList;
