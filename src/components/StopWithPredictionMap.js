import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import Card from 'material-ui/Card';
import _ from 'lodash';
import WebMercatorViewport from 'viewport-mercator-project';

import Helpers from '../helpers.js';
import Stops from '../data/stops.js';

import {defaultMapStyle, routeLineIndex} from '../style.js';
import BusStop from './BusStop.js';
import BusIcon from 'material-ui-icons/DirectionsBus';

class StopWithPredictionMap extends Component {
  constructor(props) {
    super(props)

    let stop = Stops[this.props.stopId] || null;

    this.state = {
      showSatellite: false,
      viewport: {
        latitude: parseFloat(stop.lat),
        longitude: parseFloat(stop.lon),
        zoom: 17,
        bearing: 0,
        pitch: 0,
        width: window.innerWidth > 768 ? window.innerWidth * (4/8) - 5 : window.innerWidth,
        height: window.innerWidth > 768 ? ((window.innerHeight - 75) * (5/8)) : 250,
      }
    }

    this._resize = this._resize.bind(this);
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
          width: window.innerWidth * (48) - 9,
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
    let trip = this.props.prediction

    let bbox = [
      Math.min(stop.lat, parseFloat(trip.position.lat)), 
      Math.max(stop.lat, parseFloat(trip.position.lat)), 
      Math.min(stop.lon, parseFloat(trip.position.lon)), 
      Math.max(stop.lon, parseFloat(trip.position.lon)), 
    ]
    console.log(bbox)

    const viewport = new WebMercatorViewport({width: this.state.viewport.width, height: this.state.viewport.height});
    const bound = viewport.fitBounds(
      [
        [bbox[2], bbox[0]], 
        [bbox[3], bbox[1]]
      ],
        {padding: 60}
      );
  
    style = style.setIn(['layers', routeLineIndex, 'filter', 2], parseInt(this.props.route, 10));
    style = style.setIn(['layers', 1, 'layout', 'visibility'], this.state.showSatellite ? 'visible' : 'none')
    _.forEach(style.toJS().layers, (l, i) => {
      if(l['source-layer'] === 'road') {
        style = style.setIn(['layers', i, 'layout', 'visibility'], this.state.showSatellite ? 'none' : 'visible')
      }
    })  

    // eventually set routes?
    // const routesHere = Array.from(new Set(_.flattenDeep(_.map(stop.transfers, 0).concat(stop.routes))))
    // style = style.setIn(['layers', routeLineIndex, 'filter'], ["in", "route_num"].concat(routesHere.map(r => parseInt(r, 10))))

    return (
      <Card className="map">
        <MapGL
          width={this.state.viewport.width}
          height={this.state.viewport.height}
          latitude={bound.latitude}
          longitude={bound.longitude}
          zoom={bound.zoom < 15 ? bound.zoom : 15}
          mapStyle={style}
          mapboxApiAccessToken={Helpers.mapboxApiAccessToken} 
          attributionControl={false}
          onClick={this._onClick}>
          <Marker latitude={stop.lat} longitude={stop.lon} offsetLeft={-20} offsetTop={-20}>
            <BusStop style={{ height: 30, width: 30, borderRadius: 9999, background: 'rgba(0,0,0,.75)', padding: 2.5, color: 'yellow' }} />
          </Marker>
          <Marker latitude={trip.position.lat} longitude={trip.position.lon} offsetLeft={-20} offsetTop={-20}>
            <BusIcon style={{ height: 30, width: 30, borderRadius: 9999, background: 'rgba(0,0,0,.75)', padding: 2.5, color: 'white' }} />
          </Marker>
        </MapGL>
      </Card>
    )
  }
}

export default StopWithPredictionMap;