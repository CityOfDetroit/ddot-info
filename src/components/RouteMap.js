import React, { Component } from 'react';
import StaticMap from 'react-map-gl';
import Helpers from '../helpers.js'

import {defaultMapStyle, highlightLayerIndex} from '../style.js'

import WebMercatorViewport from 'viewport-mercator-project';


class RouteMap extends Component {

  render() {
    const route = this.props.route
    const viewport = new WebMercatorViewport({width: window.innerWidth/2, height: window.innerHeight});
    const bound = viewport.fitBounds(route.bbox,
      {padding: 50}
    );

    let style = defaultMapStyle
    style = style.setIn(['layers', highlightLayerIndex, 'filter', 2], route.id.toString())

    return (
      <StaticMap
        width={window.innerWidth/2}
        height={window.innerHeight}
        latitude={bound.latitude}
        longitude={bound.longitude}
        zoom={bound.zoom}
        mapStyle={style}
        mapboxApiAccessToken={Helpers.mapboxApiAccessToken} >
      </StaticMap>    
    )
  }
}

export default RouteMap;