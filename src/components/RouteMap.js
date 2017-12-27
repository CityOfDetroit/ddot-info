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
      'style': 'mapbox://styles/cityofdetroit/cjbo6aw134a5j2rlucd3tkaxt',
      'center': [-83.0458, 42.3314],
      'zoom': 10,
      'attributionControl': false
    });

    const route_id = this.props.routeId.toString()
    const stops = this.props.stops
    const bounds = this.props.bbox
    const realTime = this.props.realTime

    map.on('load', function() {
      map.setFilter('ddot-routes', ["==", "route_num", route_id])
      map.setFilter('ddot-stops', ["in", "stop_id"].concat(stops.map(m => { return m.toString() })))
      map.setFilter('ddot-stops copy', ["in", "stop_id"].concat(stops.map(m => { return m.toString() })))
      map.setLayoutProperty('ddot-stops', 'visibility', 'visible')
      map.setLayoutProperty('ddot-stops copy', 'visibility', 'visible')
      map.fitBounds(bounds, {'padding': 100})      
      console.log(realTime)
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
      <div id="route-map" className="h6" style={{width: '100%'}}>
      </div>
    )
  }
}

export default RouteMap;
