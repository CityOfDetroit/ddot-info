import React from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment';
// import _ from 'lodash';
// import Helpers from '../helpers';

import Stops from '../data/stops.js';

class Stop extends React.Component {

  fetchData() {
    fetch(`https://ddot-proxy-test.herokuapp.com/api/where/vehicles-for-agency/DDOT.json?key=BETA&includePolylines=false`)
    .then(response => response.json())
    .then(d => {
      console.log(d)
    })
    .catch(e => console.log(e));
  }

  componentDidMount() {
    this.fetchData()
    this.interval = setInterval(() => this.fetchData(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const stopId = this.props.match.params.name
    return (
      <div>
        {stopId} {Stops[stopId.toString()]}
      </div>
    )
  }
}

// LineRealTime.propTypes = {
//   match: PropTypes.shape({
//     isExact: PropTypes.bool,
//     params: PropTypes.shape({
//       name: PropTypes.string,
//     }),
//     path: PropTypes.string,
//     url: PropTypes.string,
//   }).isRequired,
// }

export default Stop;