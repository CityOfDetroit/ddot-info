import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

class RouteMap extends Component {
  constructor(props) {
    super(props);

    console.log(props)

    this.state = {
      drewMap: false,
      realTime: {},
      map: {}
    };
  }

  fetchData() {
    fetch(`https://ddot-proxy-test.herokuapp.com/api/where/vehicles-for-agency/DDOT.json?key=BETA&includePolylines=false`)
    .then(response => response.json())
    .then(d => {
      let x = d.data.list.filter(trip => {
        return this.props.tripIds.indexOf(trip.tripId.slice(-4)) > 0
      })

      let geojson = x.map(bus => {
        return {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [bus.tripStatus.position.lon, bus.tripStatus.position.lat]
          },
          "properties": {
            "nextStop": bus.tripStatus.nextStop
          }
        }
      })

      let fc = {
        "type": "FeatureCollection",
        "features": geojson
      }

      this.state.map.getSource('realtime').setData(fc)
      this.state.map.getSource('realtime-background').setData(fc)
    })
    .catch(e => console.log(e));
  }

  drawMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjaXZvOWhnM3QwMTQzMnRtdWhyYnk5dTFyIn0.FZMFi0-hvA60KYnI-KivWg';

    const map = new mapboxgl.Map({
      'container': 'route-map',
      'style': 'mapbox://styles/cityofdetroit/cjbo6aw134a5j2rlucd3tkaxt',
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
      map.setLayoutProperty('ddot-stops', 'visibility', 'visible')
      map.setLayoutProperty('ddot-stops copy', 'visibility', 'visible')
      map.fitBounds(bounds, {'padding': 50})

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
          "circle-color": "purple",
          "circle-opacity": 0.35,
          "circle-stroke-color": "black",
          "circle-stroke-width": 2
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
          "icon-image": "bus-11"
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
        <div id="route-map" className="h6 z-1">
        </div>
    )
  }
}

export default RouteMap;
