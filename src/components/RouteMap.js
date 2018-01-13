import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import _ from 'lodash';
import Colors from '../data/colors.js';


class RouteMap extends Component {
  constructor(props) {
    super(props);

    console.log(props)

    this.state = {
      drewMap: false,
      map: {},
    };
  }


  updateMap() {
    if(this.state.drewMap){
      let fc = {
        "type": "FeatureCollection",
        "features": this.props.trips
      }
      this.state.map.getSource('realtime').setData(fc)
      this.state.map.getSource('realtime-background').setData(fc)
    }
  }

  drawMap() {

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjamNiY2RuZDcwMTV1MnF0MW9kbGo5YTlyIn0.5s818a6deB6YJJK4yFkMwQ';

    const map = new mapboxgl.Map({
      'container': 'map',
      'style': 'mapbox://styles/cityofdetroit/cjbzk1bqwg9972spc0hcb804b',
      'center': [-83.0458, 42.3314],
      'zoom': 10,
      'attributionControl': false,
      'interactive': false
    });

    const route_id = this.props.routeId.toString()
    const stops = this.props.stops
    const bounds = this.props.bbox
    const realtimeTrips = this.props.trips

    map.on('load', function() {
      map.setFilter('ddot-routes', ["==", "route_num", route_id])
      map.setFilter('ddot-stops', ["in", "stop_id"].concat(stops.map(m => { return m.toString() })))
      map.setFilter('ddot-stops copy', ["in", "stop_id"].concat(stops.map(m => { return m.toString() })))
      // map.setLayoutProperty('ddot-stops', 'visibility', 'visible')
      map.setLayoutProperty('ddot-stops copy', 'visibility', 'visible')
      map.fitBounds(bounds, {'padding': 25})

      map.addLayer({
        "id": "realtime-background",
        "type": "circle",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": realtimeTrips
          }
        },
        "paint": {
          "circle-radius": 10,
          "circle-color": {
            property: "direction",
            type: "categorical",
            stops: _.toPairs(Colors),
          },
          "circle-opacity": 0.5,
          "circle-stroke-color": "black",
          "circle-stroke-width": 1.5,
          "circle-stroke-opacity": 0.5
        }
      })

      map.addLayer({
        "id": "realtime",
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": realtimeTrips
          }
        },
        "layout": {
          "icon-image": "bus-11",
          "icon-allow-overlap": true
        },
        "paint": {
          "icon-opacity": 0.75
        }
      })

    });

    this.setState({
      drewMap: true,
      map: map,
    });

    this.updateMap()
  }


  componentDidMount() {
    this.drawMap()
    this.interval = setInterval(() => this.updateMap(), 5000);
    this.updateMap()
  }

  render() {
    return (
      <div id="map" className="map h6" style={{width: '100%'}}></div>
    )
  }
}

export default RouteMap;
