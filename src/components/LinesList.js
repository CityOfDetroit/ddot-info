import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LineLink from './LineLink';

class LinesList extends Component {
  render() {
    return (
      <div className="overflow-scroll vh-75 ba ma2">
          {this.props.lines.map(line =>
            <div className="ph3 pv2 bb b--light-silver" key={line.id}>
              <LineLink key={line.id} id={line.id} routeId={line.rt_id} name={line.rt_name} color={line.color} />
            </div>
          )}
      </div>
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
