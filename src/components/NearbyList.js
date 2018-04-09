import React from 'react';
import _ from 'lodash';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse'


import StopCard from './StopCard';
import StopInlineLink from './StopInlineLink';
import RouteLink from './RouteLink';

import Stops from '../data/stops.js'

/** List of stops within walk radius */
class NearbyList extends React.Component {

  render() {

    // const coords = this.props.coords
    // const nearbyStops = _.sortBy(this.props.data.data.list, c => { 
    //   return Math.sqrt(Math.pow(Math.abs(coords.latitude - c.lat), 2) + Math.pow(Math.abs(coords.longitude - c.lon), 2))
    // })
    // const stops = nearbyStops.map(s => Stops[s.id.slice(5,)])
    // let possibilities = [].concat.apply([], stops.map(s => s.routes))
    // const nearbyRoutes = _.uniqBy(possibilities, p => { return p[0] + p[1] })
    // const nearbyRoutesWithStops = nearbyRoutes.map(nr => {
    //   let stop = _.find(stops, s => {return s.routes.indexOf(nr) > -1})
    //   return [nr[0], nr[1], stop.id]
    // })
    // const grouped = _.groupBy(nearbyRoutesWithStops, 0)

    return (
      <div className="routes">
        {Object.keys(this.props.stops).map(k => (
          <Card key={k} style={{margin: '1em'}}>
            <CardHeader component={RouteLink} id={k} />
            <CardContent>
              {this.props.stops[k].map(d => (
                <div key={d[1]}>{d[1]}: <StopInlineLink id={d[2]} /></div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}

export default NearbyList;
