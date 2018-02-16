import React, { Component } from 'react';
import StaticMap from 'react-map-gl';
import Helpers from '../helpers.js'
import _ from 'lodash'

import buffer from '@turf/buffer';
import bbox from '@turf/bbox';

import {defaultMapStyle, routeLineIndex, stopLabelIndex, stopPointIndex} from '../style.js'

import WebMercatorViewport from 'viewport-mercator-project';

import MapSatelliteSwitch from './MapSatelliteSwitch';

class NearbyMap extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showSatellite: false,
      viewport: {
        latitude: this.props.coords.latitude,
        longitude: this.props.coords.longitude,
        zoom: 17,
        bearing: 0,
        pitch: 0,
        width: window.innerWidth > 650 ? window.innerWidth / 2 : window.innerWidth,
        height: window.innerWidth > 650 ? window.innerHeight - 100 : window.innerHeight * 4 / 10
      }
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      showSatellite: event.target.checked ? true : false
    })
  }

  _resize = () => {
    if (window.innerWidth > 650) {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: window.outerWidth / 2,
          height: window.innerHeight - 100
        }
      });
    }
    else {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: window.innerWidth,
          height: window.innerHeight * 4 / 10
        }
      });
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this._resize);
  }

  render() {

    console.log(this.props)

    // show all nearby stops
    const stopIds = _.map(this.props.data.data.list, s => { return s.id.slice(5) })
    let style = defaultMapStyle
    style = style.setIn(['layers', stopPointIndex, 'filter'], ["in", "stop_id"].concat(stopIds))
    style = style.setIn(['layers', stopLabelIndex, 'filter'], ["in", "stop_id"].concat(stopIds))
    style = style.setIn(['layers', stopLabelIndex, 'layout', 'visibility'], 'visible')
    style = style.setIn(['layers', stopPointIndex, 'layout', 'visibility'], 'visible')

    style = style.setIn(['layers', 1, 'layout', 'visibility'], this.state.showSatellite ? 'visible' : 'none')
    _.forEach(style.toJS().layers, (l, i) => {
      if(l['source-layer'] === 'road') {
        style = style.setIn(['layers', i, 'layout', 'visibility'], this.state.showSatellite ? 'none' : 'visible')
      }
    })  


    // show all nearby routes
    const routeIds = _.map(this.props.data.data.references.routes, r => { return parseInt(r.shortName, 10)})
    style = style.setIn(['layers', routeLineIndex, 'filter'], ["in", "route_num"].concat(_.map(routeIds, r => { return r.toString() })))

    // set data for geolocated source to coords
    const geolocatedPoint = [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            this.props.coords.longitude,
            this.props.coords.latitude
          ]
        }
      }
    ]
    style = style.setIn(['sources', 'geolocated', 'data'], {"type": "FeatureCollection", "features": geolocatedPoint})

    // making some walking dist radii
    const walkRadii = [buffer(geolocatedPoint[0].geometry, 250, {units: 'meters'})]
    const radiusBbox = bbox(walkRadii[0])

    const viewport = new WebMercatorViewport({width: this.state.viewport.width, height: this.state.viewport.height});
    const bound = viewport.fitBounds(
    [
      [radiusBbox[0], radiusBbox[1]], 
      [radiusBbox[2], radiusBbox[3]]
    ],
      {padding: window.innerWidth > 650 ? 50 : window.innerWidth / 30}
    )


    style = style.setIn(['sources', 'walk-radius', 'data'], {"type": "FeatureCollection", "features": walkRadii})

    return (
      <div className="map">
        <MapSatelliteSwitch onChange={this.handleChange} />
        <StaticMap
          width={this.state.viewport.width}
          height={this.state.viewport.height}
          latitude={bound.latitude}
          longitude={bound.longitude}
          zoom={bound.zoom}
          mapStyle={style}
          mapboxApiAccessToken={Helpers.mapboxApiAccessToken} >
        </StaticMap> 
      </div>
    )
  }
}

export default NearbyMap;