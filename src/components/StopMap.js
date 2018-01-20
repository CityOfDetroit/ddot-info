import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

class StopMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drewMap: false,
      map: {},
    };
  }

  drawMap() {

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjamNiY2RuZDcwMTV1MnF0MW9kbGo5YTlyIn0.5s818a6deB6YJJK4yFkMwQ';

    const map = new mapboxgl.Map({
      'container': 'map',
      'style': 'mapbox://styles/cityofdetroit/cjbzk1bqwg9972spc0hcb804b',
      'center': this.props.center,
      'zoom': 15,
      'attributionControl': false,
      'interactive': false
    });

    const stopId = this.props.stopId

    map.on('load', function() {
      map.setFilter('ddot-stops', ["in", "stop_id", stopId])
      map.setFilter('ddot-stops copy', ["in", "stop_id", stopId])
      map.setLayoutProperty('ddot-stops copy', 'visibility', 'visible')
      map.setLayoutProperty('ddot-stops', 'visibility', 'visible')
    });

    this.setState({
      drewMap: true,
      map: map,
    });
  }


  componentDidMount() {
    this.drawMap()
  }

  render() {
    return (
      <div id="map" className="map h6 stopMap" style={{width: '100%'}}></div>
    )
  }
}

export default StopMap;
