import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Stops from '../data/stops.js';
import Schedules from '../data/schedules.js';

class StopLink extends Component {
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
      <div className="w-100 pa2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px dashed #ccc', }}>
          <div className="w-50">

            <Link 
              className="dim black hover-mid-gray glow fw3 db mb1" style={{fontSize: '1em'}} 
              to={{ pathname: `/stop/${this.props.id}/` }}>
              <strong>{this.props.showDir ? `${Stops[this.props.id].name} (${Stops[this.props.id].dir})` : `${Stops[this.props.id].name}`}</strong>
            </Link>
            <span className="pa1 fw5 f7" style={{background: '#eee'}}>#{this.props.id}</span>

          </div>
          <div className="w-50" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
          {Stops[this.props.id] && routes.length < 25 ? routes.map((r, i) => (
            <Link className={exclude.toString() === r.toString() ? 'dn' : "dim black link underline-hover hover-mid-gray glow mr2"} to={{pathname: `/route/${r}`}} key={i}>
              <div className={exclude.toString() === r.toString() ? `dn` : `white fw7 f5 tc mv1`} style={exclude.toString() === r.toString() ? {display: 'none'} : { display: 'flex', alignItems:'center',  justifyContent: 'center', width: '2em', height: '2em', backgroundColor: Schedules[r].color }}>
                {r}
              </div> 
            </Link>
          )) : `All downtown routes`}
          </div>
      </div>
    )
  }
}

StopLink.propTypes = {
  id: PropTypes.string.isRequired,
  exclude: PropTypes.string,
}

export default StopLink;
