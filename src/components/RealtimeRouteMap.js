import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import _ from 'lodash';

import Colors from '../data/colors.js';

class RealtimeRouteMap extends Component {
  constructor(props) {
    super(props);
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
      if(this.state.map.isSourceLoaded('realtime')) {
        this.state.map.getSource('realtime').setData(fc)
        this.state.map.getSource('realtime-background').setData(fc)
      }
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
      'interactive': true
    });

    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      }
    }));

    const route_id = this.props.routeId.toString()
    const stops = this.props.stops
    const bounds = this.props.bbox
    const realtimeTrips = this.props.trips

    map.on('load', function() {
      map.setFilter('ddot-routes', ["==", "route_num", route_id])
      map.setFilter('ddot-stops', ["in", "stop_id"].concat(stops.map(m => { return m.toString() })))
      map.setFilter('ddot-stops copy', ["in", "stop_id"].concat(stops.map(m => { return m.toString() })))
      map.setLayoutProperty('ddot-stops copy', 'visibility', 'visible')
      map.fitBounds(bounds, {'padding': 25})
      
      map.addLayer({
        "id": "realtime-background",
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": realtimeTrips
          }
        },
        "layout": {
          "icon-image": "bus-15",
          "icon-allow-overlap": true
        },
        "paint": {
          "icon-opacity": 0.75
        }
      });

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
          "text-field": '{displayTripId}',
          "text-font": ["Gibson Detroit SemiBold"],
          "text-size": 13,
          "text-allow-overlap": true,
          "text-padding": 3,
          "text-anchor": {
            property: "direction",
            type: "categorical",
            stops: [
              ["northbound", "right"],
              ["southbound", "left"],
              ["westbound", "top"],
              ["eastbound", "bottom"],
              ["clockwise", "top"]
            ]
          },
          "text-offset": {
            property: "direction",
            type: "categorical",
            stops: [
              ["northbound", [-1,.2]],
              ["southbound", [1,.2]],
              ["westbound", [0,.75]],
              ["eastbound", [0,-.5]],
              ["clockwise", [0,0.75]]
            ]
          }
        },
        "paint": {
          "text-color": "white",
          "text-halo-color": {
            property: "direction",
            type: "categorical",
            stops: _.toPairs(Colors),
          },
          "text-halo-width": 8,
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
    this.interval = setInterval(() => this.updateMap(), 3000);
  }

  render() {
    return (
      <div id="map" className="map h6"></div>
    )
  }
}

export default RealtimeRouteMap;
