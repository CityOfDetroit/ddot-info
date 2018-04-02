import React from 'react';
import Card, { CardHeader, CardContent } from 'material-ui/Card';

import StopCard from './StopCard';

class NearbyList extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader title='Stops' />
        <CardContent>
          {this.props.data.data.list.length} stops nearby
          {this.props.data.data.list.map((a, i) => (
            <StopCard id={a.id.slice(5, )} key={i} showRoutes />
          ))}
        </CardContent>
      </Card>
    );
  }
}

export default NearbyList;
