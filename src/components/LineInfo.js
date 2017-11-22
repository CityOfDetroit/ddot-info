import React from 'react';
import PropTypes from 'prop-types';

import TopNav from './TopNav';
import Helpers from '../helpers';

class LineInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      info: '',
    }
  }

  componentDidMount() {
    fetch(`https://ddot-proxy-test.herokuapp.com/api/where/stops-for-route/${this.props.location.state.id}.json?key=BETA&includePolylines=false`)
      .then(response => response.json())
      .then(d => {
        console.log(d)
        this.setState({ info: JSON.stringify(d.data) })
      })
  }

  render = () => {
    return (
      <div>
        <TopNav />
        <h1>{this.props.match.params.name}</h1>
        <p>{Helpers.getDescByRouteId(this.props.location.state.id)}</p>
        <h3>Route map, schedule & real-time data for this route:</h3>
        <span className='w-100'>{this.state.info}</span>
      </div>
    )
  }
}

LineInfo.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
}

export default LineInfo;
