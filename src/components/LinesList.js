import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LineLink from './LineLink';

class LinesList extends Component {
  render() {
    return (
      <ul className="list pl0 ml0 w-25 ba b--light-silver br3 ma2 vh-75 overflow-scroll">
        {this.props.lines.map(line =>
          <LineLink key={line.id} id={line.id} routeId={line.rt_id} name={line.rt_name} color={line.color} />
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
    longName: PropTypes.string.isRequired,
    shortName: PropTypes.string.isRequired,
    textColor: PropTypes.string,
    type: PropTypes.number,
    url: PropTypes.string,
  })).isRequired,
}

export default LinesList;
