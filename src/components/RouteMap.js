import React, { Component } from 'react';
import StaticMap from 'react-map-gl';
import Helpers from '../helpers.js'

const RouteMap = (routeId) => (
    <StaticMap
      width={window.innerWidth}
      height={window.innerHeight}
      latitude={42.356}
      longitude={-83.143}
      zoom={12}
      mapStyle={Helpers.mapboxStyle}
      mapboxApiAccessToken={Helpers.mapboxApiAccessToken} >
    </StaticMap>    
)

export default RouteMap;