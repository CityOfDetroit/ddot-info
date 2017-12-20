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
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjaXZvOWhnM3QwMTQzMnRtdWhyYnk5dTFyIn0.FZMFi0-hvA60KYnI-KivWg';

    const map = new mapboxgl.Map({
      'container': 'route-map',
      'style': 'mapbox://styles/cityofdetroit/cjbenda5y98wy2rpghe2ry5jj',
      'center': [-83.0458, 42.3314],
      'zoom': 10
    });

    const route_id = this.props.routeId.toString()

    console.log(route_id)

    map.on('load', function() {
      map.setFilter('ddot-routes', ["==", "route_num", route_id])
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
      <div id="route-map" style={{width: 500, height: 400}}>
      </div>
    )
  }
}

export default RouteMap;
