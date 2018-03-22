import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Stops from '../data/stops.js';

class StopCard extends Component {
  render() {
    const exclude = this.props.exclude || '';
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
          <span className="">{this.props.showDir ? `${Stops[this.props.id].name} (${Stops[this.props.id].dir})` : `${Stops[this.props.id].name}`}</span>
        </Link>
        <span className="f6 pv1">Stop ID #{this.props.id}</span>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {routes.map((r, i) => (
          <Link className={exclude.toString() === r[0].toString() ? 'dn' : "dim black link underline-hover hover-mid-gray glow mr2"} to={{pathname: `/route/${r}`}} key={i}>
            {/* <div className={exclude.toString() === r[0].toString() ? `dn` : `white fw7 f5 tc mv1`} style={exclude.toString() === r[0].toString() ? {display: 'none'} : { display: 'flex', alignItems:'center',  justifyContent: 'center', width: '2em', height: '2em', backgroundColor: Schedules[r[0]].color }}>
              {r}
            </div>  */}
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
