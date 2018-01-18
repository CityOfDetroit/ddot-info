import React from 'react';
import PropTypes from 'prop-types';

import Stops from '../data/stops.js';

import StopHeader from './StopHeader';
import StopMap from './StopMap';
import StopRouteList from './StopRouteList';


class Stop extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      predictions: {},
      fetchedPredictions: false
    }
  }

  fetchData() {
    fetch(`https://ddot-proxy-test.herokuapp.com/api/where/arrivals-and-departures-for-stop/DDOT_${this.props.match.params.name}.json?key=BETA&includePolylines=false`)
    .then(response => response.json())
    .then(d => {
      console.log(d)
      this.setState({ predictions: d, fetchedPredictions: true })
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
    const stopName = Stops[stopId.toString()].name
    const stopRoutes = Stops[stopId.toString()].routes
    const stopCoords = [Stops[stopId.toString()].lon, Stops[stopId.toString()].lat]
    return (
      <div className='stop'>
        <StopHeader id={stopId} name={stopName} />
        <StopMap stopId={stopId} center={stopCoords}/>
        {this.state.fetchedPredictions ? <StopRouteList routes={stopRoutes} predictions={this.state.predictions} /> : null }
      </div>
    )
  }
}

Stop.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
}

export default Stop;
