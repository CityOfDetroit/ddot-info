import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import { Link } from 'react-router-dom'
import Card from 'material-ui/Card';
import _ from 'lodash';

import Helpers from '../helpers.js';
import MapSatelliteSwitch from './MapSatelliteSwitch';
import Stops from '../data/stops.js';

import {defaultMapStyle, routeLineIndex} from '../style.js';
import BusStop from './BusStop.js';

class StopMap extends Component {
  constructor(props) {
    super(props)

    let stop = Stops[this.props.stopId] || null;

    this.state = {
      showSatellite: true,
      viewport: {
        latitude: parseFloat(stop.lat),
        longitude: parseFloat(stop.lon),
        zoom: 16.5,
        bearing: 0,
        pitch: 0,
        width: window.innerWidth > 768 ? window.innerWidth * (4/8) - 5 : window.innerWidth,
        height: window.innerWidth > 768 ? ((window.innerHeight - 75) * (5/8)) : 250,
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this._resize = this._resize.bind(this);
  }

  handleChange(event) {
    console.log(event)
    this.setState({
      showSatellite: event.target.checked ? true : false
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      viewport: {
        ...this.state.viewport,
        latitude: parseFloat(Stops[nextProps.stopId].lat),
        longitude: parseFloat(Stops[nextProps.stopId].lon),
      }
    })
  }

  _resize = () => {
    if (window.innerWidth > 768) {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: window.innerWidth * (4/8) - 5,
          height: ((window.innerHeight - 75) * (5/8))
        }
      });
    } else {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: window.innerWidth,
          height: 250
        }
      });
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this._resize);
  }

  render() {
    let style = defaultMapStyle
    let stop = Stops[this.props.stopId] || null

    style = style.setIn(['layers', 1, 'layout', 'visibility'], this.state.showSatellite ? 'visible' : 'none')
    _.forEach(style.toJS().layers, (l, i) => {
      if(l['source-layer'] === 'road') {
        style = style.setIn(['layers', i, 'layout', 'visibility'], this.state.showSatellite ? 'none' : 'visible')
      }
    })  

    // eventually set routes?
    const routesHere = Array.from(new Set(_.flattenDeep(_.map(stop.transfers, 0).concat(stop.routes))))
    style = style.setIn(['layers', routeLineIndex, 'filter'], ["in", "route_num"].concat(routesHere.map(r => parseInt(r, 10))))

    return (
      <Card className="map">
        <MapGL
          width={this.state.viewport.width}
          height={this.state.viewport.height}
          latitude={this.state.viewport.latitude}
          longitude={this.state.viewport.longitude}
          zoom={this.state.viewport.zoom}
          mapStyle={style}
          mapboxApiAccessToken={Helpers.mapboxApiAccessToken} 
          attributionControl={false}
          onClick={this._onClick}>
          <MapSatelliteSwitch onChange={this.handleChange} checked='true'/>
          <Marker latitude={stop.lat} longitude={stop.lon} onClick={this._onClick} offsetLeft={-20} offsetTop={-20}>
            <BusStop style={{ height: 30, width: 30, borderRadius: 9999, background: 'rgba(0,0,0,.75)', padding: 2.5, color: 'yellow' }} />
          </Marker>
          {stop.transfers.map(s => (
            <Marker latitude={Stops[s[2]].lat} longitude={Stops[s[2]].lon} offsetLeft={-7.5} offsetTop={-7.5}>
              <Link to={{pathname: `/stop/${s[2]}`}}>
                <BusStop style={{ height: 15, width: 15, borderRadius: 9999, background: 'rgba(0,0,0,.65)', padding: 2.5, color: 'white' }}/>
              </Link>
            </Marker>
          ))}
        </MapGL>
      </Card>
    )
  }
}

export default StopMap;