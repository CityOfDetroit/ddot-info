import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

class RouteMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drewMap: false,
      map: {},
    };
  }

  drawMap() {

    const route = this.props.route

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjamNiY2RuZDcwMTV1MnF0MW9kbGo5YTlyIn0.5s818a6deB6YJJK4yFkMwQ';

    const map = new mapboxgl.Map({
      'container': 'map',
      'style': 'mapbox://styles/cityofdetroit/cjd0iccnv1k7r2rnun0sbvxab',
      'center': [-83.0458, 42.3314],
      'zoom': 10,
      'attributionControl': false,
      'interactive': false
    });

    map.on('load', function () {
      map.setFilter('ddot-routes', ["==", "route_num", route.id])
      map.fitBounds(route.bbox, {
        'padding': 75,
        'easing': (function() { return 1; }),
        'duration': 0
      })
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
      <div id = "map" className = "map h6"> </div>
    )
  }
}

export default RouteMap;