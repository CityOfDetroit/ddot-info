import React, { Component } from 'react';
import StaticMap from 'react-map-gl';
import Helpers from '../helpers.js'

import {defaultMapStyle, routeLineIndex} from '../style.js'

import WebMercatorViewport from 'viewport-mercator-project';

class RealtimeRouteMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        latitude: 42,
        longitude: -83,
        zoom: 17,
        bearing: 0,
        pitch: 0,
        width: window.innerWidth > 650 ? window.innerWidth / 2 : window.innerWidth,
        height: window.innerWidth > 650 ? window.innerHeight - 100 : window.innerHeight * 4 / 10
      }
    }

    this._resize = this._resize.bind(this)
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
    const viewport = new WebMercatorViewport({width: this.state.viewport.width, height: this.state.viewport.height});
    const bound = viewport.fitBounds(this.props.bbox,
      {padding: window.innerWidth > 650 ? 50 : window.innerWidth / 30}
    );

    // make current route visible
    let style = defaultMapStyle
    style = style.setIn(['layers', routeLineIndex, 'filter', 2], this.props.routeId)

    // set the data
    style = style.setIn(['sources', 'realtime', 'data'], {"type": "FeatureCollection", "features": this.props.trips})

    console.log(this.props.trips)

    return (
      <div className="map">
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

export default RealtimeRouteMap;