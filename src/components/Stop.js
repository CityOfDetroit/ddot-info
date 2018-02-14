import React from 'react';
import PropTypes from 'prop-types';

import Stops from '../data/stops.js';
import StopHeader from './StopHeader';
import StopMap from './StopMap';
import StopTransfers from './StopTransfers';
import StopRouteList from './StopRouteList';
import Helpers from '../helpers';

class Stop extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      predictions: {},
      fetchedPredictions: false
    }
  }

  fetchData() {
    fetch(`${Helpers.endpoint}/arrivals-and-departures-for-stop/DDOT_${this.props.match.params.name}.json?key=BETA&includePolylines=false`)
    .then(response => response.json())
    .then(d => {
      this.setState({ 
        predictions: d, 
        fetchedPredictions: true 
      })
    })
    .catch(e => console.log(e));
  }

  componentDidMount() {
    this.fetchData()
    this.interval = setInterval(() => this.fetchData(), 20000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const stopId = this.props.match.params.name
    const stopName = Stops[stopId.toString()].name
    const stopRoutes = Stops[stopId.toString()].routes
    const stopCoords = [Stops[stopId.toString()].lon, Stops[stopId.toString()].lat]
    const stopTransfers = Stops[stopId.toString()].transfers
    return (
      <div className='App'>
        <StopHeader id={stopId} name={stopName} />
        <StopMap stopId={stopId} center={stopCoords}/>
        <div className='list pa3'>
          {this.state.fetchedPredictions ? <StopRouteList routes={stopRoutes} predictions={this.state.predictions} /> : `Loading real-time arrival data...` }
          {stopTransfers.length > 0 ? <StopTransfers stops={stopTransfers} /> : null}
        </div>
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
