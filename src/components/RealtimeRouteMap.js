import React, { Component } from 'react';
import StaticMap from 'react-map-gl';
import Helpers from '../helpers.js'

import {defaultMapStyle, routeLineIndex} from '../style.js'

import WebMercatorViewport from 'viewport-mercator-project';

class RealtimeRouteMap extends Component {

  render() {
    const viewport = new WebMercatorViewport({width: window.innerWidth/2, height: (window.innerHeight - 100)});
    const bound = viewport.fitBounds(this.props.bbox,
      {padding: 50}
    );

    // make current route visible
    let style = defaultMapStyle
    style = style.setIn(['layers', routeLineIndex, 'filter', 2], this.props.routeId)

    // set the data
    style = style.setIn(['sources', 'realtime', 'data'], {"type": "FeatureCollection", "features": this.props.trips})

    return (
      <div className="map">
        <StaticMap
          width={window.innerWidth/2}
          height={window.innerHeight-100}
          latitude={bound.latitude || 42.5}
          longitude={bound.longitude || -83 }
          zoom={bound.zoom}
          mapStyle={style}
          mapboxApiAccessToken={Helpers.mapboxApiAccessToken} >
        </StaticMap> 
      </div>
    )
  }
}

export default RealtimeRouteMap;