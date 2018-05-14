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
        {/* {Object.keys(stops).map((s, i) => (
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
            {stops[s].map(st => (
              <div style={{padding: 5, marginLeft: 40, fontSize: '.85em'}}>
                <RouteLink id={st[0]} direction={st[1]}/>
              </div>
                // <div>{st[0]} {st[1]}</div>
                // <div key={st[2]} style={{ padding: 10 }}>{Helpers.lookup[st[1]]} {i+1}: <StopInlineLink id={st[2]}/></div>
              ))}
          </div>
        ))} */}
      </div>
    );
  }
}

export default StopTransfers;
