import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Helpers from '../helpers';
import NearbyMap from './NearbyMap';
import NearbyList from './NearbyList'

class FeaturesNearLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      fetchedData: false
    }
  }

  fetchData(meters, coords) {
    fetch(`${Helpers.endpoint}/stops-for-location.json?key=BETA&radius=${meters}&lat=${coords.latitude}&lon=${coords.longitude}`)
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
    this.fetchData(this.props.meters, this.props.coords)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.meters !== nextProps.meters) {
      this.fetchData(nextProps.meters, this.props.coords)
    }
  }

  render() {
    return (
      <div>
        {this.state.fetchedData ? 
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ marginRight: '1em' }}><NearbyMap data={this.state.data} coords={this.props.coords} currentRadius={this.props.meters} /></div>
            <div><NearbyList data={this.state.data} /></div>
          </div> : null }
      </div>
    )
  }
}

FeaturesNearLocation.propTypes = {
  coords: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  meters: PropTypes.string,
}

export default FeaturesNearLocation;
