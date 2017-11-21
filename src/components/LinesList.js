import React, { Component } from 'react';

import LineLink from './LineLink';

class LinesList extends Component {
  render() {
    return (
      <ul className="list pl0 ml0 w-25 ba b--light-silver br3 ma2 vh-75 overflow-scroll">
        {this.props.lines.map(line =>
          <LineLink key={line.shortName} short={line.shortName} long={line.longName} />
        )}
      </ul>
    )
  }
}

export default LinesList;
