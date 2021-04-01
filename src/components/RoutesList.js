import React from "react";

import RouteListItem from './RouteListItem'
import SiteSection from "./SiteSection";

const RoutesList = ({ routes, scroll=true }) => {

  // const gridStyle = {
  //   gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
  //   gridGap: `.5rem`,
  //   boxSizing: "border-box",
  //   WebkitOverflowScrolling: "touch",
  //   height: 'auto'
  // };

  return (
    <SiteSection title="All bus routes" scroll={scroll} fullWidth>
      {
        routes.map(r => (<RouteListItem route={r} key={r.short} />))
      }
    </SiteSection>
  );
};

export default RoutesList;
