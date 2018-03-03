import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Stops from '../data/stops.js';
import Schedules from '../data/schedules.js';

class StopCard extends Component {
  render() {
    const exclude = this.props.exclude || '';
    console.log(exclude)
    let routes = [];

    if (Stops[this.props.id]) {
      if (this.props.showTransfers && Stops[this.props.id] && Stops[this.props.id].transfers.length > 0) {
        routes = Stops[this.props.id].routes;
        Stops[this.props.id].transfers.map(t => {
          return routes = routes.concat(t[1])
        })
        routes = Array.from(new Set(routes)).sort()
      } else {
        routes = Stops[this.props.id].routes.sort()
      }
    }

    return (
      <div className="f5 fw3 ma1" style={{display: 'flex', flexDirection: 'column', padding: '.5em', background: '#eee'}}>
        <Link 
          className="dim black hover-mid-gray glow" style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}} 
          to={{ pathname: `/stop/${this.props.id}/` }}>
        <span className="pa1 mr2 f7 fw7" style={{background: 'yellow'}}>#{this.props.id}</span>
          <span className="">{this.props.showDir ? `${Stops[this.props.id].name} (${Stops[this.props.id].dir})` : `${Stops[this.props.id].name}`}</span>
        </Link>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {routes.map((r, i) => (
          <Link className={exclude.toString() === r.toString() ? 'dn' : "dim black link underline-hover hover-mid-gray glow mr2"} to={{pathname: `/route/${r}`}} key={i}>
            <div className={exclude.toString() === r.toString() ? `dn` : `white fw7 f5 tc mv1`} style={exclude.toString() === r.toString() ? {display: 'none'} : { display: 'flex', alignItems:'center',  justifyContent: 'center', width: '2em', height: '2em', backgroundColor: Schedules[r].color }}>
              {r}
            </div> 
          </Link>
        ))}
        </div>
      </div>
    )
  }
}

StopCard.propTypes = {
  id: PropTypes.string.isRequired,
  exclude: PropTypes.string,
}

export default StopCard;
