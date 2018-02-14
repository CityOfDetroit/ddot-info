import React, { Component } from 'react';
import StaticMap from 'react-map-gl';
import Helpers from '../helpers.js'

import WebMercatorViewport from 'viewport-mercator-project';


class RouteMap extends Component {

  render() {
    const route = this.props.route
    const viewport = new WebMercatorViewport({width: window.innerWidth, height: window.innerHeight});
    const bound = viewport.fitBounds(route.bbox,
      {padding: 50}
    );

    return (
      <StaticMap
        width={window.innerWidth}
        height={window.innerHeight}
        latitude={bound.latitude}
        longitude={bound.longitude}
        zoom={bound.zoom}
        mapStyle={Helpers.mapboxStyle}
        mapboxApiAccessToken={Helpers.mapboxApiAccessToken} >
      </StaticMap>    
    )
  }
}

export default RouteMap;