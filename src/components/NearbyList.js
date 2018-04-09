import React from 'react';
import _ from 'lodash';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse'

import Helpers from '../helpers.js'
import StopCard from './StopCard';
import StopInlineLink from './StopInlineLink';
import RouteLink from './RouteLink';

import Stops from '../data/stops.js'
import GridList, {GridListTile} from 'material-ui/GridList'

/** List of stops within walk radius */
class NearbyList extends React.Component {

  render() {

   return (
      <GridList cellHeight='auto' style={{overflowY: 'scroll', padding: '.5em', height: window.innerWidth < 650 ? 400 : 500}} spacing={20}>
        {Object.keys(this.props.stops).map(k => (
          <GridListTile key={k} style={{}}>
            <RouteLink id={k} />
            {this.props.stops[k].map(d => (
              <div key={d[1]} style={{padding: '.25em 0em'}}>{Helpers.lookup[d[1]]}: <StopInlineLink id={d[2]} /></div>
            ))}
          </GridListTile>
        ))}
      </GridList>
    );
  }
}

export default NearbyList;
