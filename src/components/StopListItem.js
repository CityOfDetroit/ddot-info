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
    )
  }
}

StopListItem.propTypes = {
  id: PropTypes.string.isRequired,
  exclude: PropTypes.string,
}

export default StopListItem;
