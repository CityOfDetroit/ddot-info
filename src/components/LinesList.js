import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LineLink from './LineLink';

class LinesList extends Component {
  render() {
    return (
      <ul className="list pa1 ba bg-white b--light-silver br3 ma2 overflow-scroll" style={{height: '60vh'}}>
        {this.props.lines.map(line =>
          <li className="ph3 pv2 bb b--light-silver">
            <LineLink key={line.id} id={line.id} routeId={line.rt_id} name={line.rt_name} color={line.color} />
          </li>
        )}
      </ul>
    )
  }
}

LinesList.propTypes = {
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

export default LinesList;
