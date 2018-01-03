import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import LineColorLegend from './LineColorLegend.js'

class RouteMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drewMap: false,
      map: {}
    };
  }

  drawMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjaXZvOWhnM3QwMTQzMnRtdWhyYnk5dTFyIn0.FZMFi0-hvA60KYnI-KivWg';

    const map = new mapboxgl.Map({
      'container': 'system-map',
      'style': 'mapbox://styles/cityofdetroit/cjbo6aw134a5j2rlucd3tkaxt',
      'center': [-83.0458, 42.3314],
      'zoom': 10,
      'attributionControl': false
    });

    map.on('load', function() {
    });

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
        <div id="system-map" className="w-50-l w-50-m w-100-s z-1">        
            <LineColorLegend />
        </div>
    )
  }
}

export default RouteMap;
