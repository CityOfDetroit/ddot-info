import React, { Component } from 'react';
import StaticMap from 'react-map-gl';
import Helpers from '../helpers.js'
import Stops from '../data/stops.js'

import _ from 'lodash'

import {defaultMapStyle, routeLineIndex, highlightPointIndex, highlightLabelIndex, stopPointIndex, stopLabelIndex} from '../style.js'

class StopMap extends Component {

  render() {
    let style = defaultMapStyle
    const stop = Stops[this.props.stopId] || null

    // set style for main stop
    style = style.setIn(['layers', highlightPointIndex, 'filter'], ['==', 'stop_id', this.props.stopId])
    style = style.setIn(['layers', highlightPointIndex, 'layout', 'visibility'], 'visible')
    style = style.setIn(['layers', highlightLabelIndex, 'filter'], ['==', 'stop_id', this.props.stopId])
    style = style.setIn(['layers', highlightLabelIndex, 'layout', 'visibility'], 'visible')

    // set labels for transfers
    style = style.setIn(['layers', stopPointIndex, 'filter'], ["in", "stop_id"].concat(_.map(stop.transfers, 0)))
    style = style.setIn(['layers', stopLabelIndex, 'filter'], ["in", "stop_id"].concat(_.map(stop.transfers, 0)))
    style = style.setIn(['layers', stopLabelIndex, 'layout', 'visibility'], 'visible')

    // eventually set routes?
    const routesHere = Array.from(new Set(_.flattenDeep(_.map(stop.transfers, 1).concat(stop.routes))))
    style = style.setIn(['layers', routeLineIndex, 'filter'], ["in", "route_num"].concat(routesHere))

    return (
      <div className="map">
        <StaticMap
          width={window.innerWidth/2}
          height={window.innerHeight-100}
          latitude={parseFloat(stop.lat)}
          longitude={parseFloat(stop.lon)}
          zoom={16.5}
          mapStyle={style}
          mapboxApiAccessToken={Helpers.mapboxApiAccessToken} >
        </StaticMap> 
      </div>
    )
  }
}

export default StopMap;