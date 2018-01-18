import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class LineLink extends Component {
  render() {
    return (
      <div style={{minWidth: '200px'}}>
        <span className='white fw7 f5 w2 pv2 tc dib' style={{backgroundColor: this.props.color}}>
          {this.props.id}
        </span> 
        <span className='tr pl1 f5 fw6 pl2'>
          <Link className="dim black hover-mid-gray" to={{pathname: `/route/${this.props.id}/real-time`, 
            state: { id: this.props.id, routeId: this.props.routeId, name: this.props.name }}}>{this.props.name}</Link>
        </span>
      </div>
    )
  }
}

LineLink.propTypes = {
  id: PropTypes.string.isRequired,
  routeId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default LineLink;
