import React, { Component } from 'react';
import MapGL, { NavigationControl} from 'react-map-gl';
import Helpers from '../helpers.js';
import {defaultMapStyle, routeLineIndex, routeLabelIndex, routeCaseIndex} from '../style.js';

/** Interactive map of the DDOT system, showing all routes.  */
class SystemMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 42.366927924767694,
        longitude: -83.10024569894267,
        zoom: 11,
        bearing: -1,
        width: window.innerWidth,
        height: window.innerHeight
      },
      settings: {
        dragPan: true,
        scrollZoom: true,
        touchZoom: true,
        touchRotate: true,
        keyboard: true,
        doubleClickZoom: true,
        minZoom: 9,
        maxZoom: 19,
        minPitch: 0,
        maxPitch: 0,
      }
    };

    this._resize = this._resize.bind(this);
    this._updateViewport = this._updateViewport.bind(this);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  }

  _updateViewport = (viewport) => {
    this.setState({viewport});
  }
  
  componentDidMount() {
    window.addEventListener('resize', this._resize);
  }

  componentWillUnmount() {
  }

  render() {
    let style = defaultMapStyle;
    style = style.setIn(['layers', routeLineIndex, 'filter', 0], "!=");
    style = style.setIn(['layers', routeLabelIndex, 'filter', 0], "!=");
    style = style.setIn(['layers', routeCaseIndex, 'filter', 0], "!=");

    return (
          <MapGL
            {...this.state.viewport}
            {...this.state.settings}
            mapStyle={style}
            mapboxApiAccessToken={Helpers.mapboxApiAccessToken} 
            onViewportChange={this._updateViewport} 
            >
            <div style={{ position: 'absolute', right: 15, top: 15, transform: 'scale(1.2, 1.2)' }}>
              <NavigationControl onViewportChange={this._updateViewport} showCompass={false} />
            </div>
          </MapGL>
    );
  }
}

export default SystemMap;
