import React, { Component } from 'react';
import StaticMap from 'react-map-gl';
import _ from 'lodash';
import buffer from '@turf/buffer';
import bbox from '@turf/bbox';
import WebMercatorViewport from 'viewport-mercator-project';

import {defaultMapStyle, routeLineIndex, stopPointIndex, stopPointIndexTwo, walkRadiusLabelIndex} from '../style.js'
import MapSatelliteSwitch from './MapSatelliteSwitch';
import Helpers from '../helpers.js';

/** Map of users location and stops within walk radius */
class NearbyMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSatellite: false,
      viewport: {
        latitude: this.props.coords.latitude,
        longitude: this.props.coords.longitude,
        zoom: 17,
        bearing: 0,
        pitch: 0,
        width: window.innerWidth > 650 ? window.innerWidth/2 : window.innerWidth,
        height: window.innerWidth > 650 ? 500 : 350
      }
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      showSatellite: event.target.checked ? true : false
    });
  }

  _resize = () => {
    if (window.innerWidth > 650) {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: window.innerWidth/2,
          height: 500
        }
      });
    } else {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: window.innerWidth,
          height: 350
        }
      });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
  }

  render() {

    let style = defaultMapStyle;
    const stopIds = Object.keys(this.props.stops).map(rid => {
      return this.props.stops[rid].map(r => r[2])
    })
    console.log(_.flatten(stopIds))
    style = style.setIn(['layers', stopPointIndexTwo, 'filter'], ["in", "stop_id"].concat(_.flatten(stopIds)));
    style = style.setIn(['layers', stopPointIndex, 'layout', 'visibility'], 'visible');

    style = style.setIn(['layers', 1, 'layout', 'visibility'], this.state.showSatellite ? 'visible' : 'none');
    _.forEach(style.toJS().layers, (l, i) => {
      if(l['source-layer'] === 'road') {
        style = style.setIn(['layers', i, 'layout', 'visibility'], this.state.showSatellite ? 'none' : 'visible')
      }
    });

    // show all nearby routes
    const routeIds = Object.keys(this.props.stops).map(rid => parseInt(rid, 10))
    style = style.setIn(['layers', routeLineIndex, 'filter'], ["in", "route_num"].concat(routeIds));

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
    ];

    style = style.setIn(['sources', 'geolocated', 'data'], {"type": "FeatureCollection", "features": geolocatedPoint});

    // making some walking dist radii
    const walkRadii = buffer(geolocatedPoint[0].geometry, parseInt(this.props.currentRadius, 10)*1.25, {units: 'metres'});
    const radiusBbox = bbox(walkRadii);

    const viewport = new WebMercatorViewport({width: this.state.viewport.width, height: this.state.viewport.height});
    const bound = viewport.fitBounds(
    [
      [radiusBbox[0], radiusBbox[1]], 
      [radiusBbox[2], radiusBbox[3]]
    ],
      {padding: window.innerWidth > 650 ? 50 : window.innerWidth / 30}
    );

    style = style.setIn(['sources', 'walk-radius', 'data'], {"type": "FeatureCollection", "features": [walkRadii]});
    
    // set walk radius text
    style = style.setIn(['layers', walkRadiusLabelIndex, 'layout', 'text-field'], this.props.currentRadius === "200" ? `5 minute walk` : `10 minute walk`)

    return (
      <StaticMap
        width={this.state.viewport.width}
        height={this.state.viewport.height}
        latitude={bound.latitude}
        longitude={bound.longitude}
        zoom={bound.zoom}
        mapStyle={style}
        mapboxApiAccessToken={Helpers.mapboxApiAccessToken}
        children={<MapSatelliteSwitch onChange={this.handleChange} />}>
      </StaticMap> 
    );
  }
}

export default NearbyMap;