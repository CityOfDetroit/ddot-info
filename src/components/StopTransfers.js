import React from 'react';

import StopInlineLink from './StopInlineLink';
import RouteLink from './RouteLink';
import Helpers from '../helpers';

/** List of nearby stops where you can transfer to other routes by direction for Stop */
class StopTransfers extends React.Component {
  
  render() {
    const stops = this.props.stops;

    return (
      <div className="transfers">
        {Object.keys(this.props.stops).map((s, i) => (
          <div key={i} style={{ background: 'white', margin: 10, padding: 10 }}>
            <RouteLink id={s} />
            {stops[s].map(st => (
              <div key={st[2]} style={{ padding: 10 }}>{Helpers.lookup[st[1]]} {i+1}: <StopInlineLink id={st[2]}/></div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default StopTransfers;
