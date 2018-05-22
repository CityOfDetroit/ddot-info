import React from 'react';
import _ from 'lodash';
import RouteLink from './RouteLink';
import StopInlineLink from './StopInlineLink'
import Helpers from '../helpers';

/** List of nearby stops where you can transfer to other routes by direction for Stop */
class StopTransfers extends React.Component {
  
  render() {
    const routes = _.groupBy(this.props.stops, 0)
    return (
      <div className="transfers" style={{padding: 10, backgroundColor: 'white'}}>
        {Object.keys(routes).map((s, i) => (
          <div key={i} style={{ background: 'white', margin: 5, padding: 5 }}>
            <RouteLink id={s} />
            {routes[s].map(st => (
              <div style={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
              <div key={st[2]} style={{ padding: 5 }}>{Helpers.lookup[st[1]]}: <StopInlineLink id={st[2]}/></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default StopTransfers;
