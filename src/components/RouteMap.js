import React, { Component } from 'react';
import StaticMap from 'react-map-gl';
import Helpers from '../helpers.js'

import {defaultMapStyle, routeLineIndex} from '../style.js'

import WebMercatorViewport from 'viewport-mercator-project';

class RouteMap extends Component {

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
        height: window.innerWidth > 650 ? window.innerHeight - 100 : 225
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
          height: 225
        }
      });
    }
  };

  
  componentDidMount() {
    window.addEventListener('resize', this._resize);
  }

  render() {
    const route = this.props.route

    const viewport = new WebMercatorViewport({width: this.state.viewport.width, height: this.state.viewport.height});
    console.log(route.bbox)
    const bound = viewport.fitBounds(route.bbox,
      {padding: window.innerWidth > 650 ? 50 : window.innerWidth / 20}
    );

    let style = defaultMapStyle
    style = style.setIn(['layers', routeLineIndex, 'filter', 2], parseInt(route.id, 10))

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

export default RouteMap;