import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

class BusRouteMap extends Component {
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
      'style': 'mapbox://styles/cityofdetroit/cjbzk1bqwg9972spc0hcb804b',
      'center': [-83.0458, 42.3314],
      'zoom': 10,
      'attributionControl': false,
      'interactive': false
    });

    map.on('load', function () {
      map.setFilter('ddot-routes', ["==", "route_num", route.id])
      // // map.setFilter('ddot-stops', ["in", "stop_id"].concat(stops.map(m => { return m.toString() })))
      // // map.setFilter('ddot-stops copy', ["in", "stop_id"].concat(stops.map(m => { return m.toString() })))
      // // map.setLayoutProperty('ddot-stops copy', 'visibility', 'visible')
      map.fitBounds(route.bbox, {
        'padding': 25
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
    return ( <
      div id = "map"
      className = "map h6" > < /div>
    )
  }
}

export default BusRouteMap;