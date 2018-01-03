import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import _ from 'lodash';

class RouteMap extends Component {
  constructor(props) {
    super(props);

    console.log(props)

    this.state = {
      drewMap: false,
      map: {}
    };
  }

  fetchData() {
    fetch(`https://ddot-proxy-test.herokuapp.com/api/where/vehicles-for-agency/DDOT.json?key=BETA&includePolylines=false`)
    .then(response => response.json())
    .then(d => {

      let allTripIds = _.flattenDeep(Object.values(this.props.tripIds))

      let x = d.data.list.filter(trip => {
        return allTripIds.indexOf(trip.tripId.slice(-4)) > 0
      })

      let geojson = x.map(bus => {
        return {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [bus.tripStatus.position.lon, bus.tripStatus.position.lat]
          },
          "properties": {
            "tripId": bus.tripStatus.activeTripId,
            "nextStop": bus.tripStatus.nextStop,
            "direction": _.findKey(this.props.tripIds, t => { return t.indexOf(bus.tripStatus.activeTripId.slice(-4)) > 0})
          }
        }
      })

      let fc = {
        "type": "FeatureCollection",
        "features": geojson
      }

      console.log(fc)

      this.state.map.getSource('realtime').setData(fc)
      this.state.map.getSource('realtime-background').setData(fc)
    })
    .catch(e => console.log(e));
  }

  drawMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjaXZvOWhnM3QwMTQzMnRtdWhyYnk5dTFyIn0.FZMFi0-hvA60KYnI-KivWg';

    const map = new mapboxgl.Map({
      'container': 'route-map',
      'style': 'mapbox://styles/cityofdetroit/cjbzk1bqwg9972spc0hcb804b',
      'center': [-83.0458, 42.3314],
      'zoom': 10,
      'attributionControl': false,
      'interactive': false
    });

    const route_id = this.props.routeId.toString()
    const stops = this.props.stops
    const bounds = this.props.bbox

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
            "features": []
          }
        },
        "paint": {
          "circle-radius": 10,
          "circle-color": {
            property: "direction",
            type: "categorical",
            stops: [
              ['northbound', 'violet'],
              ['eastbound', 'violet'],
              ['southbound', 'orange'],
              ['westbound', 'orange'],
              ['clockwise', 'green']
            ]
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
            "features": []
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
  }


  componentDidMount() {
    this.interval = setInterval(() => this.fetchData(), 3000);
    this.drawMap()
    this.fetchData()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
        <div id="route-map" className="h6 z-1 map" style={{width: '100%'}}>
        </div>
    )
  }
}

export default RouteMap;
