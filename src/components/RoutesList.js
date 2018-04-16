import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RouteLinkIcons from './RouteLinkIcons';

class RoutesList extends Component {
  render() {
    return (
      <div 
        className="" 
        style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(350px, 1fr))`, gridGap: `.5em`, maxHeight: 370, overflowY: 'scroll' }}>
        {this.props.lines.map(line =>
          <RouteLinkIcons key={line.id} id={line.id} routeId={line.rt_id} name={line.rt_name} color={line.color} />
        )}
      </div>
    )
  }
}

RoutesList.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.shape({
    agencyId: PropTypes.string,
    color: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    textColor: PropTypes.string,
    type: PropTypes.number,
    url: PropTypes.string,
  })).isRequired,
}

export default RoutesList;
