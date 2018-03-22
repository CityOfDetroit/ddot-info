import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Stops from '../data/stops.js';
import Schedules from '../data/schedules.js';

class StopLink extends Component {
  render() {
    const exclude = this.props.exclude || '';
    let routes = [];

    if (Stops[this.props.id]) {
      if (this.props.showTransfers && Stops[this.props.id] && Stops[this.props.id].transfers.length > 0) {
        routes = Stops[this.props.id].routes.map(r => r[0]);
        Stops[this.props.id].transfers.map(t => {
          return routes = routes.concat(t[1])
        })
        routes = Array.from(new Set(routes)).sort()
      } else {
        routes = Stops[this.props.id].routes.map(r => r[0]).sort()
      }
    }

    return (
      <div className="w-100 pa2" style={this.props.showBorder ? { marginLeft: '1em', borderLeft: `6px solid ${this.props.color}`, display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px dashed #ccc'} : { display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px dashed #ccc'} }>

          {this.props.showBorder ? 
            <span className="" style={{ marginLeft: '-1.25em', border: '.25em solid white', backgroundColor: !this.props.isTimepoint ? this.props.color : 'black', borderRadius: '4em', height: '11px', width: '11px', marginRight: '1em', zIndex: 2 }} />
            : ``}

          <div className="w-50">
            <Link 
              className="dim black hover-mid-gray glow db mb1" style={{fontSize: '1em'}} 
              to={{ pathname: `/stop/${this.props.id}/` }}>
              <span>{this.props.showDir ? `${Stops[this.props.id].name} (${Stops[this.props.id].dir})` : `${Stops[this.props.id].name}`}</span>
            </Link>
            <span className="pa1 f7" style={{background: '#eee'}}>#{this.props.id}</span>

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
