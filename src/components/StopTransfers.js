import React from 'react';
import _ from 'lodash';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router-dom';
import Stops from '../data/stops.js';
import RouteLink from './RouteLink';
import StopInlineLink from './StopInlineLink'
import Helpers from '../helpers';

/** List of nearby stops where you can transfer to other routes by direction for Stop */
class StopTransfers extends React.Component {
  
  render() {
    const stops = _.groupBy(this.props.stops, 2);
    const routes = _.groupBy(this.props.stops, 0)
    console.log(stops)
    return (
      <div className="transfers" style={{padding: 10, backgroundColor: 'white'}}>
        {Object.keys(routes).map((s, i) => (
          <div key={i} style={{ background: 'white', margin: 10, padding: 10 }}>
            <RouteLink id={s} />
            {routes[s].map(st => (
              <div style={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
              <div key={st[2]} style={{ padding: 10 }}>{Helpers.lookup[st[1]]}: <StopInlineLink id={st[2]}/></div>
              <div
                style={{backgroundColor: 'rgba(0,0,0,.65)', width: 25, height: 25, fontWeight: 700, color: 'white', padding: '.5em', borderRadius: 9999, display: 'flex', alignItems: 'center', alignContent: 'center'}}
                >
                {Object.keys(stops).indexOf(st[2]) + 1}
              </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default StopTransfers;
