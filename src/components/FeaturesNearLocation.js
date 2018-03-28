import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Helpers from '../helpers';
import NearbyMap from './NearbyMap';
import NearbyList from './NearbyList'
import TopNav from './TopNav';

class FeaturesNearLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      fetchedData: false
    }
  }

  fetchData() {
    fetch(`${Helpers.endpoint}/stops-for-location.json?key=BETA&radius=200&lat=${this.props.coords.latitude}&lon=${this.props.coords.longitude}`)
    .then(response => response.json())
    .then(d => {
      this.setState({
        data: d, 
        fetchedData: true
      })
    })
    .catch(e => console.log(e));
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    return (
      <div className="App" style={{background: Helpers.colors['background']}}>
        <TopNav />
        {this.state.fetchedData ? <NearbyMap data={this.state.data} coords={this.props.coords} /> : null }
        {this.state.fetchedData ? <NearbyList data={this.state.data} /> : null }
      </div>
    )
  }
}

FeaturesNearLocation.propTypes = {
  coords: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  })
}

export default FeaturesNearLocation;
