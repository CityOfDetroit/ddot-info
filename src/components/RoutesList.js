import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RouteLink from './RouteLink';

class RoutesList extends Component {
  render() {
    return (
      <div className="ma2" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {this.props.lines.map(line =>
          <div className="pa2 ma2" style={{ width: '200px', background: '#eee' }} key={line.id}>
            <RouteLink key={line.id} id={line.id} routeId={line.rt_id} name={line.rt_name} color={line.color} />
          </div>
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
