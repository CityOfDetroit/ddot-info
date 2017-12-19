import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

class RouteMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drewMap: false,
      map: {}
    };
  }

  drawMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamVzc2ljYW1jaW5jaGFrIiwiYSI6ImNpcTB4Y2h2ODAwa3BmaG5uYW0xOHBlOGoifQ.VSD_IOgj6S1oVmrSamgZvw';

    const map = new mapboxgl.Map({
      'container': 'route-map',
      'style': 'mapbox://styles/mapbox/streets-v9',
      'center': [-83.0458, 42.3314],
      'zoom': 10
    });

    // map.on('load', function() {
    //   map.addSource();
    //   map.addLayer();
    // });

    this.setState({
      drewMap: true,
      map: map
    });
  }

  componentDidMount() {
    this.drawMap();
  }

  render() {
    return (
      <div id="route-map" style={{width: 500, height: 400}}>
      </div>
    )
  }
}

export default RouteMap;
