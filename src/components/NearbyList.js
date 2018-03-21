import React from 'react';
import Card, { CardHeader, CardContent } from 'material-ui/Card';

import RouteLink from './RouteLink';
import StopCard from './StopCard';

class NearbyList extends React.Component {
  render() {
    return (
      <div className="details pa2">
        <Card className="mv2">
          <CardHeader title="Nearby routes" />
          <CardContent className="overflow-scroll">
            {this.props.data.data.references.routes.map((r, i) => (
              <div className="mv1" key={i}>
                <RouteLink id={parseInt(r.shortName, 10)} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="mv2">
          <CardHeader title="Nearby stops" />
          <CardContent className="h5 overflow-scroll">
            {this.props.data.data.list.map((a, i) => (
              <StopCard id={a.id.slice(5, )} key={i} />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default NearbyList;
