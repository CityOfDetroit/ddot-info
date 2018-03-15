import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List'
import Stops from '../data/stops.js';
import Schedules from '../data/schedules.js';
import RouteBadge from './RouteBadge'

class StopListItem extends Component {
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
      <ListItem 
          primaryText={
            `
            ${Stops[this.props.id].name}
            ${routes.map((r, i) => (
              <RouteBadge id={r} />
            ))}
            `
          }
        >

      </ListItem>
      // <div className="f5 fw3 ma1" style={{display: 'flex', flexDirection: 'column', padding: '.5em', background: '#eee'}}>
      //   <Link 
      //     className="dim black hover-mid-gray glow" style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}} 
      //     to={{ pathname: `/stop/${this.props.id}/` }}>
      //   <span className="pa1 mr2 f7 fw7" style={{background: 'yellow'}}>#{this.props.id}</span>
      //     <span className="">{this.props.showDir ? `${Stops[this.props.id].name} (${Stops[this.props.id].dir})` : `${Stops[this.props.id].name}`}</span>
      //   </Link>
      //   <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
      //   </div>
      // </div>
    )
  }
}

StopListItem.propTypes = {
  id: PropTypes.string.isRequired,
  exclude: PropTypes.string,
}

export default StopListItem;
