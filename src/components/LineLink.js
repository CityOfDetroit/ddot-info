import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class LineLink extends Component {
  render() {
    return (
      <li className="ph3 pv2 bb b--light-silver">
        <span className='bg-dark-green white fw7 f5 w2 pv2 tc dib'>
          {this.props.short.replace(/^[0]{1,}/, '')}
        </span> 
        <span className='tr pl1 f6 fw5 pl2'>
          <Link to={`/${this.props.short}-${this.props.long}`}>{this.props.long}</Link>
        </span>
      </li>
    )
  }
}

LineLink.propTypes = {
  short: PropTypes.string.isRequired,
  long: PropTypes.string.isRequired,
}

export default LineLink;
