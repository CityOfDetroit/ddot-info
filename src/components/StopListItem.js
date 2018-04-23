import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui/List';

import Stops from '../data/stops.js';

/** Unused? */
class StopListItem extends Component {
  render() {
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
      <ListItem button>
        <ListItemText
          primary={Stops[this.props.id].name}
          secondary={routes.map((r, i) => (`${r}`)).join(",")} />
      </ListItem>
    );
  }
}

StopListItem.propTypes = {
  id: PropTypes.string.isRequired,
  exclude: PropTypes.string,
}

export default StopListItem;
