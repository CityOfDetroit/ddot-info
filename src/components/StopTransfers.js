import React from 'react';

import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router-dom'
import Stops from '../data/stops.js'
import RouteLink from './RouteLink';
import Helpers from '../helpers';

/** List of nearby stops where you can transfer to other routes by direction for Stop */
class StopTransfers extends React.Component {
  
  render() {
    const stops = this.props.stops;
    console.log(stops)
    return (
      <div className="transfers" style={{padding: 10, backgroundColor: 'white'}}>
        {Object.keys(this.props.stops).map((s, i) => (
          <div key={i} style={{ background: 'white', padding: 10 }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Avatar
                style={{backgroundColor: 'rgba(0,0,0,.65)', fontWeight: 700, color: 'white'}}
              >
                {i+1}
              </Avatar>
              <Link 
                  style={{ fontSize: '1em', color: '#000', fontWeight: 300, padding: '0px 5px 0px 10px' }} 
                  to={{ pathname: `/stop/${s}/` }}>
                  <span style={{fontWeight: 500}}>{Stops[s].name}</span>
              </Link>
              <span style={{ background: '#eee', padding: '.25em', display: 'inline-block' }}>#{s}</span>
              </div>
            {this.props.stops[s].map(st => (
              <div style={{padding: 5, marginLeft: 40, fontSize: '.85em'}}>
                <RouteLink id={st[0]} direction={st[1]}/>
              </div>
                // <div>{st[0]} {st[1]}</div>
                // <div key={st[2]} style={{ padding: 10 }}>{Helpers.lookup[st[1]]} {i+1}: <StopInlineLink id={st[2]}/></div>
              ))}
          </div>
        ))}
      </div>
    );
  }
}

export default StopTransfers;
