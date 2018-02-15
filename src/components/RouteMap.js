import React, { Component } from 'react';
import StaticMap from 'react-map-gl';
import Helpers from '../helpers.js'

import {defaultMapStyle, routeLineIndex} from '../style.js'

import WebMercatorViewport from 'viewport-mercator-project';

class RouteMap extends Component {

  render() {
    const route = this.props.route
    const viewport = new WebMercatorViewport({width: window.innerWidth/2, height: (window.innerHeight - 100)});
    const bound = viewport.fitBounds(route.bbox,
      {padding: 50}
    );

    let style = defaultMapStyle
    style = style.setIn(['layers', routeLineIndex, 'filter', 2], route.id.toString())

    return (
      <div className="map">
        <StaticMap
          width={window.innerWidth/2}
          height={window.innerHeight-100}
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

export default RouteMap;