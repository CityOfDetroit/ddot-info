import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';

import RouteLink from './RouteLink';
import StopCard from './StopCard';

class NearbyList extends React.Component {
  render() {
    return (
      <div className="details pa2">
        <Card className="mv2">
          <CardTitle title="Nearby routes" />
          <CardText>
            <div className="h5 overflow-scroll">
              {this.props.data.data.references.routes.map((r, i) => (
                <div className="mv1" key={i}>
                  <RouteLink id={parseInt(r.shortName, 10)} />
                </div>
              ))}
            </div>
          </CardText>
        </Card>
        <Card className="mv2">
          <CardTitle title="Nearby stops" />
          <CardText>
            <div className="h5 overflow-scroll">
              {this.props.data.data.list.map((a, i) => (
                <StopCard id={a.id.slice(5, )} key={i} />
              ))}
            </div>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default NearbyList;
